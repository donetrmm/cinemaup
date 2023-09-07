const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const movies = require('./API/getMovies');
const series = require('./API/getSeries');
const filtroGenero = require('./API/filtroGenero');
const seccion = require('./API/filtroSeccion');
const filtroRecientes = require('./API/filtroRecientes');
const busquedaTitulo = require('./API/busquedaTitulo');
const busquedaID = require('./API/busquedaID');

const corsOptions = {
  origin: 'http://localhost:9000',
};

app.use(cors(corsOptions)); 

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(movies);
app.use(series);
app.use(filtroGenero);
app.use(seccion);
app.use(filtroRecientes);
app.use(busquedaTitulo);
app.use(busquedaID);

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});
