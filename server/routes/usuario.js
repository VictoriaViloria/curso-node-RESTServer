const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

app.get('/', function(req, res) {
    res.json('holaaaa ');
});
//n GET se pueden actualizar registros
app.get('/usuario', function(req, res) {
    res.json('get usuario LOCAL !!!!!ji ji');
});
// POST crear nuevos registros 
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
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
        res.json({
            ok: true,
            usuario: usuariDB
        });
    });
});
// PUT actualizar data, registros
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id: id
    });
});
//DELETE
app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
});

module.exports = app;