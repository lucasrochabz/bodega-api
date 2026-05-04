export const UsersErrors = {
  USERS_NOT_FOUND: {
    statusCode: 404,
    code: 'USERS_NOT_FOUND',
    message: 'Usuários não encontrados.',
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    code: 'USER_NOT_FOUND',
    message: 'Usuário não encontrado.',
  },

  USER_NOT_CREATED: {
    statusCode: 400,
    code: 'USER_NOT_CREATED',
    message: 'Usuário não cadastrado.',
  },

  USER_ADDRESS_NOT_CREATED: {
    statusCode: 400,
    code: 'USER_ADDRESS_NOT_CREATED',
    message: 'Endereço do usuário não cadastrado.',
  },

  USER_ADDRESS_NOT_FOUND: {
    statusCode: 404,
    code: 'USER_ADDRESS_NOT_FOUND',
    message: 'Endereço não encontrado para o usuário.',
  },
};
