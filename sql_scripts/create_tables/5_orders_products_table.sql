CREATE TABLE IF NOT EXISTS orders_products (
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT UNSIGNED NOT NULL DEFAULT 1,
	PRIMARY KEY (order_id, product_id),
	FOREIGN KEY (order_id) REFERENCES orders(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);
