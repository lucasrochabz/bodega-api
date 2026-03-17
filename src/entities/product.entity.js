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

  toPersistence() {
    return {
      name: this.name,
      price: this.price,
      description: this.description,
      stock: this.stock,
      status: this.status,
      image_path: this.image_path,
    };
  }

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      stock: this.stock,
      status: this.status,
      image_path: this.image_path,
    };
  }
}

export default Product;
