require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//habilitar la carpeta public este path no es CORRECTO
//app.use(express.static(__dirname + '../public'));
//console.log(path.resolve(__dirname, '../public'));  BIEN

app.use(express.static(path.resolve(__dirname, '../public')));


//configuracion GLOBAL de RUTAS
app.use(require('./routes/index'));


//app.use(require('./routes/usuario'));
//app.use(require('./routes/login'));

//mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true },
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});