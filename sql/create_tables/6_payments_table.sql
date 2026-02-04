CREATE TABLE IF NOT EXISTS payments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	order_id INT NOT NULL,
	gateway VARCHAR(200) NOT NULL,
	payment_method ENUM('credit_card', 'pix') NOT NULL,
	transaction_id VARCHAR(200),
	payment_token VARCHAR(200) NULL,
	status ENUM('pending', 'processing', 'paid', 'failed') NOT NULL DEFAULT 'pending',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
