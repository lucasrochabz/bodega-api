import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// Pega o caminho do arquivo atual (equivalente ao __dirname no CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do banco de dados
const connectionConfig = {
  host: process.env.MYSQL_DOCKER_HOST,
  user: process.env.MYSQL_DOCKER_USER,
  password: process.env.MYSQL_DOCKER_PASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
};

// Caminho para a pasta com os scripts SQL
const scriptsPath = path.join(__dirname, 'sql_scripts/create_tables');

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
        console.log(`Script ${file} executado com sucesso.`);
      } catch (queryErr) {
        console.error(`Erro ao executar o script ${file}:`, queryErr.message);
      }
    }

    // Fecha a conexão
    await connection.end();
  } catch (error) {
    console.error('Erro ao executar os scripts:', error.message);
  }
};

// Executar os scripts
executeTables();
