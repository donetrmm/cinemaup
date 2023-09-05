const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
});

const corsOptions = {
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});
