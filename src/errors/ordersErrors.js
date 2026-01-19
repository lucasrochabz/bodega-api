export const OrdersErrors = {
  ORDERS_NOT_FOUND: {
    statusCode: 404,
    message: 'Pedidos não encontrados.',
  },

  ORDER_NOT_FOUND: {
    statusCode: 404,
    message: 'Pedido não encontrado.',
  },

  USER_ORDERS_NOT_FOUND: {
    statusCode: 404,
    message: 'Pedido(s) do usuário não encontrado(s).',
  },

  ADDRESS_NOT_FOUND: {
    statusCode: 404,
    message: 'Endereço não encontrado para o usuário.',
  },

  ORDER_NOT_CREATED: {
    statusCode: 400,
    message: 'Pedido não cadastrado.',
  },

  ORDER_PRODUCTS_NOT_CREATED: {
    statusCode: 400,
    message: 'Erro ao associar produtos ao pedido.',
  },

  INVALID_PAYMENT_EVENT: {
    statusCode: 400,
    message: 'Evento de pagamento não suportado.',
  },
};
