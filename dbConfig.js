const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Belatrix12?', 
  database: 'mydb',
};

let connection;

function createConnection() {
  return mysql.createConnection(dbConfig);
}

function handleDisconnect() {
  connection = createConnection();

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
      connection.destroy();
      console.log('Reintentando conexión en 3 segundos...');
      setTimeout(handleDisconnect, 3000);
    } else if (err.code === 'ECONNRESET') {
      console.error('Se ha producido un error de conexión reset:', err.message);
      connection.destroy();
      console.log('Reintentando conexión en 3 segundos...');
      setTimeout(handleDisconnect, 3000);
    } else {
      console.error('Error en la conexión a la base de datos:', err);
    }
  });
}

handleDisconnect();

module.exports = connection;
