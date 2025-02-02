const { getDBConnection } = require('../config/database');

const usersService = {
  createUserInDB: async (user) => {
    const connection = await getDBConnection();
    try {
      const [resultsUser] = await connection.query(
        `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)`,
        [user.name, user.email, user.password],
      );

      const userId = resultsUser.insertId;

      const [resultsAddress] = await connection.query(
        `
        INSERT INTO addresses (user_id, street, number, neighborhood, city, state, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          user.street,
          user.number,
          user.neighborhood,
          user.city,
          user.state,
          user.zip_code,
        ],
      );

      if (resultsUser.affectedRows === 0 || resultsAddress.affectedRows === 0) {
        return {
          success: false,
          message: 'Usuário não cadastrado no Banco de Dados.',
        };
      }

      return {
        success: true,
        data: {
          id: resultsUser.insertId,
          name: user.name,
          email: user.email,
          password: user.password,
          street: user.street,
          number: user.number,
          neighborhood: user.neighborhood,
          city: user.city,
          state: user.state,
          zip_code: user.zip_code,
        },
      };
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar usuário no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },
};

module.exports = usersService;
