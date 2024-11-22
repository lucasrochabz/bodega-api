const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'name_database',
});

const createTableQuery = `
  CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
  );
`;

connection.query(createTableQuery, (error, results) => {
  if (error) {
    console.error('Erro ao criar a tabela users:', error.message);
  } else {
    console.log('Tabela users criada com sucesso!');
  }
  connection.end();
});
