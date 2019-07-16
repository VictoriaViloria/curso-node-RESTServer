const express = require('express');
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
    res.json('get usuario');
});
// POST crear nuevos registros 
app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json({
        bodypersona: body
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

app.listen(3000, () => {
    console.log('escuchando puerto: ', 3000);
});