export const OrdersErrors = {
  ORDERS_NOT_FOUND: {
    statusCode: 404,
    code: 'ORDERS_NOT_FOUND',
    message: 'Pedidos não encontrados.',
  },

  ORDER_NOT_FOUND: {
    statusCode: 404,
    code: 'ORDER_NOT_FOUND',
    message: 'Pedido não encontrado.',
  },

  ORDER_NOT_CREATED: {
    statusCode: 400,
    code: 'ORDER_NOT_CREATED',
    message: 'Pedido não cadastrado.',
  },

  ORDER_PRODUCTS_NOT_CREATED: {
    statusCode: 400,
    code: 'ORDER_PRODUCTS_NOT_CREATED',
    message: 'Erro ao associar produtos ao pedido.',
  },

  ORDER_ACCESS_DENIED: {
    statusCode: 403,
    code: 'ORDER_ACCESS_DENIED',
    message: 'Você não tem permissão para acessar este pedido.',
  },

  INSUFFICIENT_STOCK: {
    statusCode: 400,
    code: 'INSUFFICIENT_STOCK',
    message: 'Estoque insuficiente para o produto.',
  },
};
