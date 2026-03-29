import '../src/config/env.js';
import databaseConfig from '../src/config/database.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import mysql from 'mysql2/promise';

// Pega o caminho do arquivo atual (equivalente ao __dirname no CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta com os scripts de inserção de dados
const insertsPath = path.join(__dirname, '../sql/insert_datas');

// Função para executar os inserts
const executeInserts = async () => {
  try {
    // Conecta ao banco de dados
    const connection = await mysql.createConnection(databaseConfig);

    // Lê os arquivos da pasta
    const files = await fs.readdir(insertsPath);
    const sqlFiles = files.filter((file) => file.endsWith('.sql'));

    for (const file of sqlFiles) {
      const filePath = path.join(insertsPath, file);
      const sql = await fs.readFile(filePath, 'utf8');

      try {
        await connection.query(sql);
        console.info(`Dados do script ${file} inseridos com sucesso.`);
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
    // fix: add throw error;
    console.error('Erro ao executar os inserts:', error.message);
  }
};

// Executar os inserts
executeInserts();
