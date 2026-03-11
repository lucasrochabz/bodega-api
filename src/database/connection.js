import mysql from 'mysql2/promise';
import databaseConfig from '../config/database.js';

// fix: estudar sobre o pool
const getDBConnection = async () => {
  try {
    const connection = await mysql.createConnection(databaseConfig);

    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

export default getDBConnection;
