const fs = require('fs/promises');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

// Configuração do banco de dados
const connectionConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
};

// Caminho para a pasta com os scripts de inserção de dados
const insertsPath = path.join(__dirname, 'sql_scripts/insert_datas');

// Função para executar os inserts
const executeInserts = async () => {
  try {
    // Conecta ao banco de dados
    const connection = await mysql.createConnection(connectionConfig);

    // Lê os arquivos da pasta
    const files = await fs.readdir(insertsPath);
    const sqlFiles = files.filter((file) => file.endsWith('.sql'));

    for (const file of sqlFiles) {
      const filePath = path.join(insertsPath, file);
      const sql = await fs.readFile(filePath, 'utf8');

      try {
        await connection.query(sql);
        console.log(`Dados do script ${file} inseridos com sucesso.`);
      } catch (queryErr) {
        console.error(
          `Erro ao inserir dados do script ${file}:`,
          queryErr.message,
        );
      }
    }

    // Fecha a conexão
    await connection.end();
  } catch (error) {
    console.error('Erro ao executar os inserts:', error.message);
  }
};

// Executar os inserts
executeInserts();
