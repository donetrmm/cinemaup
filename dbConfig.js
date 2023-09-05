const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      console.log('Reintentando conexión en 3 segundos...');
      setTimeout(handleDisconnect, 3000);
    } else {
      console.log('Conectado a la base de datos');
    }
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      console.error('Se ha producido un error de encolado después de un error fatal:', err.message);
      connection.end();
      console.log('Reintentando conexión en 3 segundos...');
      setTimeout(handleDisconnect, 3000);
    } else if (err.code === 'ECONNRESET') {
      console.error('Se ha producido un error de conexión reset:', err.message);
      connection.end();
      console.log('Reintentando conexión en 3 segundos...');
      setTimeout(handleDisconnect, 3000);
    } else {
      console.error('Error en la conexión a la base de datos:', err);
    }
  });
}

handleDisconnect();

module.exports = connection;