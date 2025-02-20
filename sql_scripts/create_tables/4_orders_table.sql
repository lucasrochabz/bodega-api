CREATE TABLE IF NOT EXISTS orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL, 
	address_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status ENUM('rascunho', 'aguardando pagamento', 'pagamento efetuado', 'concluido') NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (address_id) REFERENCES addresses(id)
);
