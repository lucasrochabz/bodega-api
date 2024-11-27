CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  description VARCHAR(200),
  stock INT,
  status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  image_path VARCHAR(255)
);
