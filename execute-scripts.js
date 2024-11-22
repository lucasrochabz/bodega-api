const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
});
// Certifique-se de criar o banco antes de rodar este script

// Caminho para a pasta com os scripts SQL
const scriptsPath = path.join(__dirname, 'sql-scripts');

// Função para executar os scripts SQL
const executeScripts = async () => {
  fs.readdir(scriptsPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler a pasta de scripts:', err);
      return;
    }

    const sqlFiles = files.filter((file) => file.endsWith('.sql'));

    sqlFiles.forEach((file) => {
      const filePath = path.join(scriptsPath, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      connection.query(sql, (queryErr) => {
        if (queryErr) {
          console.error(`Erro ao executar o script ${file}:`, queryErr.message);
        } else {
          console.log(`Script ${file} executado com sucesso.`);
        }
      });
    });

    // Fechar a conexão após terminar
    connection.end();
  });
};

// Executar os scripts
executeScripts();
