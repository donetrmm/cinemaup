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

router.get('/api/titulo/:titulo', async (req, res) => {
  try {
    const titulo = req.params.titulo;
    const query = 'SELECT * FROM movieseries WHERE titulo LIKE ?';
    const tituloBusqueda = '%' + titulo + '%';
    console.log(titulo)
    const movies = await queryPromise(query, tituloBusqueda);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

module.exports = router;
