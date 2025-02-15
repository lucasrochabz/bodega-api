CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(200) NOT NULL, 
	price DECIMAL(10, 2) NOT NULL,
	description TEXT NOT NULL,
	stock INT UNSIGNED NOT NULL DEFAULT 10,
	status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
	image_path VARCHAR(200) DEFAULT 'default_image.png'
);
