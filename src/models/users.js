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

const getOneUser = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users WHERE id=?`,
      [userId],
    );
    return results;
  } finally {
    await connection.end();
  }
};

const postOneUser = async (name, email) => {
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

const putOneUser = async (name, userId) => {
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

const deleteOneUser = async (userId) => {
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
  getOneUser,
  postOneUser,
  deleteOneUser,
  putOneUser,
};
