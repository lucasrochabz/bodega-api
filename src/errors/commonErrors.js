export const CommonErrors = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Erro interno do servidor. Tente novamente mais tarde.',
  },

  // fix: BUSINESS_ERROR_NOT_MAPPED no handleServiceResponse
  BUSINESS_ERROR_NOT_MAPPED: {
    statusCode: 500,
    message: 'Erro de negócio não mapeado.',
  },
};
