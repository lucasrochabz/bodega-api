const { getDBConnection } = require('../utils/getDBConnection');

const addToCart = async () => {
  const connection = await getDBConnection();
  const results = await connection.query(
    `
    SELECT * FROM orders`,
  );
  return results;
};

module.exports = { addToCart };
