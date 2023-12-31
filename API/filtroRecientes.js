const express = require('express');
const router = express.Router();
const connection = require('../dbConfig');
const { format } = require('date-fns');

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

router.get('/api/recientes', async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const formattedDate = format(firstDayOfLastMonth, 'dd-MM-yyyy');

    const query = 'SELECT * FROM movieseries WHERE STR_TO_DATE(fecha_estreno, "%d-%m-%Y") >= STR_TO_DATE(?, "%d-%m-%Y")';

    const movies = await queryPromise(query, [formattedDate]);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

module.exports = router;
