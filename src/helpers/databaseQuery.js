const { getDBConnection } = require('../database/connection');

const executeQuery = async (query, params = [], errorMessage) => {
  const connection = await getDBConnection();

  try {
    const [results] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw new Error(`${errorMessage}.`);
  } finally {
    await connection.end();
  }
};

module.exports = executeQuery;
