class Product {
  constructor({
    id = null,
    name,
    price,
    description,
    stock,
    status,
    image_path,
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.status = status;
    this.image_path = image_path;
  }
}

module.exports = Product;
