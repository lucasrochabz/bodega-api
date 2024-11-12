const { getDBConnection } = require('../utils/getDBConnection');

const getAllProducts = async () => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `SELECT * from products
    `,
  );
  return results;
};

const getOneProduct = async (productId) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `
    SELECT * FROM products WHERE id=?`,
    [productId],
  );
  return results;
};

const postOneProduct = async (name, price, description, stock) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `
    INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)`,
    [name, price, description, stock],
  );
  return results;
};

const putOneProduct = async (description, productId) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `
    UPDATE products SET description=? WHERE id=?`,
    [description, productId],
  );
  return results;
};

const deleteOneProduct = async (productId) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `
    DELETE FROM products WHERE id=?`,
    [productId],
  );
  return results;
};

module.exports = {
  getAllProducts,
  getOneProduct,
  putOneProduct,
  postOneProduct,
  deleteOneProduct,
};
