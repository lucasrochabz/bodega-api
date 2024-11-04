const { getDBConnection } = require('../utils/getDBConnection');

const show = async () => {
  const connection = await getDBConnection();
  const [results] = await connection.query('SELECT * from products');
  return results;
};

module.exports = {
  show,
};
