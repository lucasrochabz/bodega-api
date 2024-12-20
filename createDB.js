const fs = require('fs/promises');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

//configuração do banco de dados;
const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// Caminho para o arquivo SQL
const scriptsPath = path.join(
  __dirname,
  'sql_scripts/create_db/1_create_db.sql',
);

// Função para executar o script
const executeDB = async () => {
  // Conecta com o banco de dados
  const connection = await mysql.createConnection(connectionConfig);
  try {
    // Lê o  conteúdo do arquivo SQL
    const sql = await fs.readFile(scriptsPath, 'utf8');

    // Executa o script SQL
    await connection.query(sql);
    console.log('Banco de dados criado com sucesso.');

    // fecha a conexão
  } catch (error) {
    console.error('Erro ao criar o banco de dados', error.message);
  } finally {
    await connection.end();
  }
};

executeDB();
