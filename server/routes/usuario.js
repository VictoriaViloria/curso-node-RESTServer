const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();
const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');


app.get('/', function(req, res) {
    res.json('holaaaa ');
});
//n GET se pueden actualizar registros
app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 3;
    limite = Number(limite);
    //Usuario.find({ google: true })
    Usuario.find({ estado: true }, ' nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //  Usuario.count({ google: true }, (err, conteo) => {
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })

            });
        });
    //.exec ejecutar ese find
    //Usuario trae el Squema de usuario
    // res.json('get usuario LOCAL !!!!!ji ji');
});
// POST crear nuevos registros 
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //como lo grabamos en la base de datos?
    usuario.save((err, usuariDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuariDB.password = null;
        res.json({
            ok: true,
            usuario: usuariDB
        });
    });
});
// PUT actualizar data, registros
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    // se podria  hacer asi el arreglo anterior SON LAS QUE SI SE PUEDEN actualizar
    //delete body.password;
    //delete body.google;
    //let body = req.body;
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});
//DELETE
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        //borramos el registro fisicamente
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
    //res.json('delete usuario');
});
// app.delete('/usuario/:id', function(req, res) {
//     let id = req.params.id;
//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//         //borramos el registro fisicamente
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             })
//         }
//         if (usuarioBorrado === null) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'usuario no encontrado'
//                 }
//             });
//         }
//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });
//     });
//     //res.json('delete usuario');
// });

module.exports = app;