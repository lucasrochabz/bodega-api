export const AddressErrors = {
  // fix: tem um erro que não está sendo utilizado
  INVALID_CEP: {
    statusCode: 400,
    code: 'INVALID_CEP',
    message: 'CEP inválido.',
  },

  CEP_NOT_FOUND: {
    statusCode: 404,
    code: 'CEP_NOT_FOUND',
    message: 'CEP não encontrado.',
  },

  VIA_CEP_UNAVAILABLE: {
    statusCode: 400,
    code: 'VIA_CEP_UNAVAILABLE',
    message: 'Serviço de CEP indispónivel.',
  },
};
