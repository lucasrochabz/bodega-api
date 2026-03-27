export const productDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    description: product.description,
    stock: product.stock,
    status: product.status,
    imagePath: product.image_path,
  };
};
