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

router.get('/api/recientes', async (req, res) => {
  try {
    const today = new Date(); // Obtenemos la fecha actual
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    
    // Formateamos la fecha al formato DD/MM/AAAA
    const formattedDate = `${firstDayOfLastMonth.getFullYear()}-${String(firstDayOfLastMonth.getMonth() + 1).padStart(2, '0')}-${String(firstDayOfLastMonth.getDate()).padStart(2, '0')}`;

    const query = 'SELECT * FROM movieseries WHERE fecha_estreno >= ?';
    
    console.log(formattedDate)
    const movies = await queryPromise(query, [formattedDate]);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

module.exports = router;
