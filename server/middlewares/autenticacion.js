const jwt = require('jsonwebtoken');

// ===============
//  Verificar Token
// ===============
let verificaToken = (req, res, next) => {
    let token = req.get('token'); // Authorization

    //jwt.verify(token, SEED, (err, decoded) => {
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

    //console.log(token);
    // res.json({
    //     token: token
    // });
};

// ===================
//  Verifica AdminRole
// ===================
let VerificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};


module.exports = {
    verificaToken,
    VerificaAdmin_Role
}