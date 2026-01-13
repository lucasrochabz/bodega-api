import { ordersProductsRepository } from '../repositories/ordersProductsRepository.js';
import { ordersRepository } from '../repositories/ordersRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';
import { OrdersErrors } from '../errors/ordersErrors.js';

export const ordersService = {
  getAllOrders: async () => {
    const orders = await ordersRepository.findAll();

    if (orders.length === 0) {
      return {
        success: false,
        error: OrdersErrors.ORDERS_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Pedidos encontrados com sucesso.',
      data: orders,
    };
  },

  getUserOrders: async (userId) => {
    const userOrders = await ordersRepository.findAllByUserId(userId);

    if (userOrders.length === 0) {
      return {
        success: false,
        error: OrdersErrors.USER_ORDERS_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Pedido(s) encontrado(s) com sucesso.',
      data: userOrders,
    };
  },

  getOrderDetails: async (orderId) => {
    const orderResults = await ordersRepository.findById(orderId);

    if (!orderResults) {
      return {
        success: false,
        error: OrdersErrors.ORDER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Pedido encontrado com sucesso.',
      data: orderResults,
    };
  },

  createOrder: async ({ userId, status, products }) => {
    const addressId = await usersRepository.findAddressByUserId(userId);

    if (!addressId) {
      return {
        success: false,
        error: OrdersErrors.ADDRESS_NOT_FOUND,
      };
    }

    const orderId = await ordersRepository.insert({
      userId,
      addressId,
      status,
    });

    if (!orderId) {
      return {
        success: false,
        error: OrdersErrors.ORDER_NOT_CREATED,
      };
    }

    const orderProducts = products.map((product) => [
      orderId,
      product.product_id,
      product.quantity,
    ]);

    const isProductsInserted = await ordersProductsRepository.insertMany(
      orderProducts,
    );

    if (isProductsInserted.affectedRows === 0) {
      return {
        success: false,
        error: OrdersErrors.ORDER_PRODUCTS_NOT_CREATED,
      };
    }

    return {
      success: true,
      message: 'Pedido cadastrado com sucesso.',
      data: { id: orderId, userId, addressId, status, products },
    };
  },

  updateOrder: async ({ orderId, status }) => {
    const order = await ordersRepository.updateById({ orderId, status });

    if (order.affectedRows === 0) {
      return {
        success: false,
        error: OrdersErrors.ORDER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: { id: orderId, status },
    };
  },

  deleteOrder: async (orderId) => {
    const order = await ordersRepository.deleteById(orderId);

    if (order.affectedRows === 0) {
      return {
        success: false,
        error: OrdersErrors.ORDER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Pedido deletado com sucesso.',
      data: { id: orderId },
    };
  },
};
