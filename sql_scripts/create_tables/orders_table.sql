CREATE TABLE IF NOT EXISTS orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL, 
	address_id INT NOT NULL,
	date DATE NOT NULL,
	status ENUM('rascunho', 'aguardando pagamento', 'pagamento efetuado', 'concluido') NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (address_id) REFERENCES addresses(id)
);
