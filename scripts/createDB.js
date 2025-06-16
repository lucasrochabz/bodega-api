import '../src/env/index.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import mysql from 'mysql2/promise';

// Pega o caminho do arquivo atual (equivalente ao __dirname no CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configuração do banco de dados;
const connectionConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
};

// Caminho para o arquivo SQL
const scriptsPath = path.join(__dirname, '../sql/create_db/1_create_db.sql');

// Função para executar o script
const executeDB = async () => {
  // Conecta com o banco de dados
  const connection = await mysql.createConnection(connectionConfig);
  try {
    // Lê o  conteúdo do arquivo SQL
    let sql = await fs.readFile(scriptsPath, 'utf8');
    sql = sql.replace('${MYSQLDATABASE}', process.env.MYSQLDATABASE);

    try {
      // Executa o script SQL
      await connection.query(sql);
      console.log('Banco de dados criado com sucesso.');
    } catch (queryErr) {
      console.error('Erro ao criar Banco de dados:', queryErr);
    }

    // fecha a conexão
  } catch (error) {
    console.error('Erro ao criar o banco de dados', error.message);
  } finally {
    await connection.end();
  }
};

executeDB();
