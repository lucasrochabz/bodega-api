import getDBConnection from '../database/connection.js';

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

export default executeQuery;
