require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
app.get('/', function(req, res) {
    res.json('holaaaa ');
});
//n GET se pueden actualizar registros
app.get('/usuario', function(req, res) {
    res.json('get usuario LOCAL !!!!!');
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

mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});