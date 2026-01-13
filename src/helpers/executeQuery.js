import getDBConnection from '../database/connection.js';

const executeQuery = async (query, params = []) => {
  const connection = await getDBConnection();

  try {
    const [results] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    await connection.end();
  }
};

export default executeQuery;
