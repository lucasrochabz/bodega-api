const fs = require('fs/promises');
const mysql = require('mysql2/promise');
const path = require('path');

// Configuração do banco de dados
const connectionConfig = {
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
};

// Caminho para a pasta com os scripts SQL
const scriptsPath = path.join(__dirname, 'sql-scripts');

// Função para executar os scripts SQL
const executeScripts = async () => {
  try {
    // Conect ao banco de dados
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
