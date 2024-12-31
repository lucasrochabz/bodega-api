// class Products {
//   constructor(id, name, price, description, stock, status, image_path) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.description = description;
//     this.stock = stock;
//     this.status = status;
//     this.image_path = image_path;
//   }
// }

// module.exports = Products;

const createProduct = (
  id,
  name,
  price,
  description,
  stock,
  status,
  imagePath,
) => ({
  id,
  name,
  price,
  description,
  stock,
  status,
  imagePath,
});

module.exports = createProduct;

// uso
const createProduct = require('./models/productModel');

const newProduct = createProduct(
  null,
  'Produto X',
  100.0,
  'Descrição do produto',
  10,
  'ativo',
  'path/to/image.jpg',
);
console.log(newProduct);
