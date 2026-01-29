export const createProductResDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
    status: product.status,
    imagePath: product.image_path,
  };
};
