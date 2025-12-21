export const AuthErrors = {
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: 'E-mail ou senha incorretos.',
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    message: 'Usuário não encontrado.',
  },

  // INVALID_RESET_TOKEN: {
  //   statusCode: 400,
  //   message: 'Token inválido ou expirado',
  // },

  // RESET_PASSWORD_REQUEST_FAILED: {
  //   statusCode: 500,
  //   message: 'Erro ao processar a recuperação de senha.',
  // },
};
