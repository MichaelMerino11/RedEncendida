const pool = require('../config/db');

// Obtener todas las subestaciones
const getAllSubestaciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subestaciones');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener subestaciones' });
  }
};

// Obtener una subestación por nombre
const getSubestacionByName = async (req, res) => {
  const { name } = req.params;
  try {
    const result = await pool.query('SELECT * FROM subestaciones WHERE nombre = $1', [name.toLowerCase()]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Subestación no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la subestación' });
  }
};

module.exports = { getAllSubestaciones, getSubestacionByName };
