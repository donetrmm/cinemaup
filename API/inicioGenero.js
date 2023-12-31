const express = require('express');
const router = express.Router();
const connection = require('../dbConfig');

const queryPromise = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

router.get('/api/inicio/genero/:genero', async (req, res) => {
  try {
    const genero = req.params;
    const query = 'SELECT * FROM movieseries WHERE genero = ? LIMIT 4';
    const movies = await queryPromise(query, genero.genero);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

module.exports = router;
