const express = require("express");

const router = express.Router();

var listados = require('../controller/listados')

router.get('/listado', listados.listado)
router.get('/buscar/:busqueda', listados.buscar)
router.post('/crear', listados.crear)
router.delete('/borrar/:borrar', listados.borrar)
router.put('/modificar/:modificar', listados.modificar)
router.get('/listado2', listados.listado2)
router.get('/totalsaldo', listados.totalsaldo)
router.get('/totalNumeroRegistros', listados.totalNumeroRegistros)
router.get('/intervalo/:from/:to/:busqueda', listados.intervalo)




module.exports = router;
