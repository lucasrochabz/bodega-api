CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	email VARCHAR(200) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
  status ENUM ('ativo', 'intativo') NOT NULL DEFAULT 'ativo'
);
