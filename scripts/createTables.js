import '../src/config/env.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import mysql from 'mysql2/promise';

// Pega o caminho do arquivo atual (equivalente ao __dirname no CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do banco de dados
const connectionConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
};

// Caminho para a pasta com os scripts SQL
const scriptsPath = path.join(__dirname, '../sql/create_tables');

// Função para executar os scripts SQL
const executeTables = async () => {
  try {
    // Conecta ao banco de dados
    const connection = await mysql.createConnection(connectionConfig);

    // Lê os arquivos da pasta
    const files = await fs.readdir(scriptsPath);
    const sqlFiles = files.filter((file) => file.endsWith('.sql'));

    for (const file of sqlFiles) {
      const filePath = path.join(scriptsPath, file);
      const sql = await fs.readFile(filePath, 'utf8');

      try {
        await connection.query(sql);
        console.info(`Script ${file} executado com sucesso.`);
      } catch (queryErr) {
        console.error(`Erro ao executar o script ${file}:`, queryErr.message);
      }
    }

    // Fecha a conexão
    await connection.end();
  } catch (error) {
    // fix: add throw error;
    console.error('Erro ao executar os scripts:', error.message);
  }
};

// Executar os scripts
executeTables();
