const { getDBConnection } = require('../utils/getDBConnection');

const getAllProducts = async () => {
  const connection = await getDBConnection();
  const [results] = await connection.query(`SELECT * from products`);
  return results;
};

const getOneProduct = async (productId) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(
    `SELECT * FROM products WHERE id=?`,
    [productId],
  );
  return results;
};

module.exports = {
  getAllProducts,
  getOneProduct,
};
