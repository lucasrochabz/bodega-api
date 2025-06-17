import mysql from 'mysql2/promise';

const getDBConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,
    });

    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

export default getDBConnection;
