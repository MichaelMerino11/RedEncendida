const express = require('express');
const { getAllSubestaciones, getSubestacionByName } = require('../controllers/subestacionesController');
const router = express.Router();

// Ruta para obtener todas las subestaciones
router.get('/', getAllSubestaciones);

// Ruta para obtener una subestación por nombre
router.get('/:name', getSubestacionByName);

module.exports = router;
