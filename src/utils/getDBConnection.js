const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

const getDBConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });
  return connection;
};

module.exports = { getDBConnection };
