import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const getDBConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_DOCKER_HOST,
      user: process.env.MYSQL_DOCKER_USER,
      password: process.env.MYSQL_DOCKER_PASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,
    });

    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

export default getDBConnection;
