require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
    // parse applicaction/
app.use(bodyParser.urlencoded({ extended: false }))
    // parse aplicationjson
app.use(bodyParser.json())
app.use(require('./routes/impresora'))

mongoose.connect(process.env.URLDB, { useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err
    console.log("Base de datos online");
})

app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto ", 3000);
})