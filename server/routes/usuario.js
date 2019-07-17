const express = require('express');
const app = express();

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
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        })
    } else {
        res.json({
            bodypersona: body
        });
    }
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