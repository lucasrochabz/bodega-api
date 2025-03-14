const { addressesRepository } = require('../repositories/addressesRepository');
const { usersRepository } = require('../repositories/usersRepository');

const usersService = {
  fetchAllUsers: async () => {
    try {
      const users = await usersRepository.fetchAll();

      if (users.length === 0) {
        return { success: false, message: 'Usuários não encontrados.' };
      }

      return { success: true, data: users };
    } catch (error) {
      console.error('Erro no Service ao buscar usuários:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar usuários.',
      };
    }
  },

  fetchUser: async (userId) => {
    try {
      const user = await usersRepository.fetchById(userId);

      if (user.length === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return { success: true, data: user[0] };
    } catch (error) {
      console.error('Erro no Service ao buscar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar usuário.',
      };
    }
  },

  registerUser: async (user) => {
    try {
      const newUser = await usersRepository.insertUser(user);

      const addresses = await addressesRepository.insertAddress(
        newUser.insertId,
        user,
      );

      if (newUser.affectedRows === 0 || addresses.affectedRows === 0) {
        return {
          success: false,
          message: 'Usuário não cadastrado no Banco de Dados.',
        };
      }

      return {
        success: true,
        data: {
          id: newUser.insertId,
          name: user.name,
          last_name: user.last_name,
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
      console.error('Erro no Service ao cadastrar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao cadastrar usuário.',
      };
    }
  },

  editUser: async (userId, userData) => {
    try {
      const userUpdated = await usersRepository.editById(userId, userData);

      if (userUpdated.affectedRows === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return { success: true, data: { id: userId, name: userData.name } };
    } catch (error) {
      console.error('Erro no Service ao atualizar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao atualizar usuário.',
      };
    }
  },

  removeUser: async (userId) => {
    try {
      const userRemoved = await usersRepository.removeById(userId);

      if (userRemoved.affectedRows === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return { success: true, data: { id: userId } };
    } catch (error) {
      console.error('Erro no Service ao deletar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao deletar usuário.',
      };
    }
  },
};

module.exports = { usersService };
