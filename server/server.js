const express = require('express');
const app = express();

app.get('/', function(req, res) {
    // res.send('Hello World');
    res.json('Hello World');
})

app.listen(3000, () => {
    console.log('escuchando puerto: ', 3000);
});