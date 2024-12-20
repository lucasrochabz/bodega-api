CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(200) NOT NULL, 
	description TEXT NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock INT UNSIGNED NOT NULL DEFAULT 0,
	status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
);
