const { getDBConnection } = require('../utils/getDBConnection');

const getAllUsers = async () => {
  const connection = await getDBConnection();
  const [results] = await connection.query(`SELECT * FROM users`);
  return results;
};

const getOneUser = async (userId) => {
  const connection = await getDBConnection();
  const [results] = await connection.query(`SELECT * FROM users WHERE id=?`, [
    userId,
  ]);
  return results;
};

module.exports = {
  getAllUsers,
  getOneUser,
};
