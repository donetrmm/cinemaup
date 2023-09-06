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

router.get('/api/series', async (req, res) => {
  try {
    const query = 'SELECT * FROM movieseries WHERE tipo = "Serie"';
    const movies = await queryPromise(query);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

module.exports = router;