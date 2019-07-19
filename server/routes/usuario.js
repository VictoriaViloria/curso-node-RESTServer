const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();
const Usuario = require('../models/usuario');

app.get('/', function(req, res) {
    res.json('holaaaa ');
});
//n GET se pueden actualizar registros
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 3;
    limite = Number(limite);
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios: usuarios
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
app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
});

module.exports = app;