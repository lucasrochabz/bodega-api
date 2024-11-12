const { getDBConnection } = require('../utils/getDBConnection');

const getAllUsers = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users`,
    );
    return results;
  } finally {
    await connection.end();
  }
};

const getUser = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users
      JOIN addresses ON users.id = addresses.user_id
      WHERE users.id=?`,
      [userId],
    );
    return results;
  } finally {
    await connection.end();
  }
};

const createUser = async ({ name, email }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO users (name, email) VALUES (?,?)`,
      [name, email],
    );
    return results;
  } finally {
    await connection.end();
  }
};

const updateUser = async ({ name, userId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE users SET name=? WHERE id=?`,
      [name, userId],
    );
    return results;
  } finally {
    await connection.end();
  }
};

const deleteUser = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM users WHERE id=?`,
      [userId],
    );
    return results;
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
