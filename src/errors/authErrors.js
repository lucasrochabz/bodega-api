export const AuthErrors = {
  // fix: add code: 'UNAUTHENTICATED' abaixo do status
  UNAUTHENTICATED: {
    statusCode: 401,
    message: 'Acesso negado. Usuário não autenticado.',
  },

  INVALID_TOKEN: {
    statusCode: 401,
    message: 'Token inválido ou expirado',
  },

  UNAUTHORIZED_ACCESS: {
    statusCode: 403,
    message: 'Acesso negado. Permissões insuficientes.',
  },

  INVALID_WEBHOOK: {
    statusCode: 401,
    message: 'Webhook não autorizado.',
  },

  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: 'E-mail ou senha incorretos.',
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    message: 'Usuário não encontrado.',
  },
};
