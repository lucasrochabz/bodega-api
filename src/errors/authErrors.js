export const AuthErrors = {
  UNAUTHENTICATED: {
    statusCode: 401,
    code: 'UNAUTHENTICATED',
    message: 'Acesso negado. Usuário não autenticado.',
  },

  INVALID_TOKEN: {
    statusCode: 401,
    code: 'INVALID_TOKEN',
    message: 'Token inválido ou expirado',
  },

  UNAUTHORIZED_ACCESS: {
    statusCode: 403,
    code: 'UNAUTHORIZED_ACCESS',
    message: 'Acesso negado. Permissões insuficientes.',
  },

  INVALID_WEBHOOK: {
    statusCode: 401,
    code: 'INVALID_WEBHOOK',
    message: 'Webhook não autorizado.',
  },

  INVALID_CREDENTIALS: {
    statusCode: 401,
    code: 'INVALID_CREDENTIALS',
    message: 'E-mail ou senha incorretos.',
  },
};
