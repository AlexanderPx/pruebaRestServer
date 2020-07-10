const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const Impresora = require('../models/impresora');
const _ = require('underscore');
const { json } = require('body-parser');



app.get('/impresora', (req, res) => {

    Impresora.find({}).exec((err, impresoras) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Impresora.countDocuments({}, (err, cont) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })

            }
            var impresorasResults = [];

            for (var i = 0; i < cont; i++) {
                impresorasResults.push({
                    id: impresoras[i]._id,
                    marca: impresoras[i].marca,
                    modelo: impresoras[i].modelo,
                    serie: impresoras[i].serie,
                    color: impresoras[i].color,
                    ip: impresoras[i].ip,
                    precio: impresoras[i].precio
                })
            }
            res.json({
                ok: true,
                impresorasResults,
                numeroDeImpresoras: cont
            })

        });

    })
});

app.post('/impresora', (req, res) => {
    let body = req.body
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio
    })
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            impresora: impresoraDB
        })
    })
})

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['serie', 'contador', 'marca'])
    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            impresora: impresoraBD
        })
    })
})

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;

    Impresora.findByIdAndDelete(id, (err, impresoraEliminada) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                err
            })
        }
        if (!impresoraEliminada) {
            res.json({
                ok: true,
                err: {
                    message: "Impresora no encontrada"
                }
            })
        } else {
            res.json({
                ok: true,
                impresora: impresoraEliminada
            });
        }

    });
});


module.exports = app