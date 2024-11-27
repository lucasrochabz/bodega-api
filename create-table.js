const fs = require('fs/promises');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

// Configuração do banco de dados
const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// Caminho para a pasta com os scripts SQL
const scriptsPath = path.join(__dirname, 'sql-scripts/create-tables');

// Função para executar os scripts SQL
const executeScripts = async () => {
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
executeScripts();
