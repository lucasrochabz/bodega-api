CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY NOT NULL,
  user_id INT,
  rua VARCHAR(255) NOT NULL,
  numero INT,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(100) NOT NULL,
  cep CHAR(8),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
