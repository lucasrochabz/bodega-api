export const createProductDTO = (body) => {
  return {
    name: body.name,
    price: body.price,
    description: body.description,
    stock: body.stock,
    status: body.status,
    image_path: body.imagePath,
  };
};
