import { ordersProductsRepository } from '../repositories/ordersProductsRepository.js';
import { paymentEventsMapper } from '../mappers/paymentEventsMapper.js';
import { ordersRepository } from '../repositories/ordersRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';
import { OrdersErrors } from '../errors/ordersErrors.js';
import { UsersErrors } from '../errors/usersErrors.js';

export const ordersService = {
  getAllOrders: async () => {
    const orders = await ordersRepository.findAll();

    if (orders.length === 0) {
      throw OrdersErrors.ORDERS_NOT_FOUND;
    }

    return orders;
  },

  getMyOrders: async (userId) => {
    const myOrders = await ordersRepository.findAllByUserId(userId);

    return myOrders;
  },

  getOrderById: async ({ user, orderId }) => {
    const order = await ordersRepository.findById(orderId);

    if (!order) {
      throw OrdersErrors.ORDER_NOT_FOUND;
    }

    const isAdmin = user.role === 'admin';
    const isOwner = order.user_id === user.id;

    if (!isAdmin && !isOwner) {
      throw OrdersErrors.ORDER_ACCESS_DENIED;
    }

    return order;
  },

  createOrder: async ({ userId, status, products }) => {
    const addressId = await usersRepository.findAddressByUserId(userId);

    if (!addressId) {
      throw UsersErrors.USER_ADDRESS_NOT_FOUND;
    }

    const orderId = await ordersRepository.insert({
      userId,
      addressId,
      status,
    });

    if (!orderId) {
      throw OrdersErrors.ORDER_NOT_CREATED;
    }

    const orderProducts = products.map((product) => [
      orderId,
      product.product_id,
      product.quantity,
    ]);

    const isProductsInserted =
      await ordersProductsRepository.insertMany(orderProducts);

    if (isProductsInserted.affectedRows === 0) {
      throw OrdersErrors.ORDER_PRODUCTS_NOT_CREATED;
    }

    return {
      id: orderId,
      userId,
      addressId,
      status,
      products,
    };
  },

  // fix ver como posso usar esse service
  updateOrder: async ({}) => {
    const order = await ordersRepository.updateByOrderId({});
    if (order.affectedRows === 0) {
      return {
        message: 'Evento já processado ou pedido inexistente.',
        data: {},
      };
    }
    return {};
  },

  markAsPaid: (order_id) => {
    return ordersRepository.updateStatus({
      id: order_id,
      status: 'pagamento efetuado',
    });
  },

  deleteOrderById: async (orderId) => {
    const order = await ordersRepository.deleteById(orderId);

    if (order.affectedRows === 0) {
      throw OrdersErrors.ORDER_NOT_FOUND;
    }

    return { id: orderId };
  },
};
