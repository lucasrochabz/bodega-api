import { addressesRepository } from '../repositories/addressesRepository.js';
import { ordersProductsRepository } from '../repositories/ordersProductsRepository.js';
import { ordersRepository } from '../repositories/ordersRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';

export const ordersService = {
  fetchAllOrders: async () => {
    const orders = await ordersRepository.fetchAll();

    try {
      if (orders.length === 0) {
        return { success: false, message: 'Pedidos não encontrados.' };
      }

      return { success: true, data: orders };
    } catch (error) {
      console.error('Erro no Service ao buscar pedidos:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar pedidos.',
      };
    }
  },

  fetchUserOrders: async (userId) => {
    try {
      const userOrders = await ordersRepository.fetchAllUserOrders(userId);

      if (userOrders.length === 0) {
        return {
          success: false,
          message: 'Pedido(s) do usuário não encontrado(s) no Banco de Dados.',
        };
      }

      return { success: true, data: userOrders };
    } catch (error) {
      console.error('Erro no Service ao buscar pedido(s) do usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar pedido(s) do usuário.',
      };
    }
  },

  fetchOrderDetails: async (orderId) => {
    try {
      const orderDetails = await ordersRepository.fetchOrderById(orderId);

      const address = await addressesRepository.fetchAddressById(
        orderDetails.address_id,
      );

      if (orderDetails.length === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: { ...orderDetails, ...address } };
    } catch (error) {
      console.error('Erro no Service ao buscar pedido:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar pedido.',
      };
    }
  },

  registerOrder: async ({ userId, status, products }) => {
    try {
      const addressId = await usersRepository.fetchUserAddress(userId);

      if (!addressId) {
        return {
          success: false,
          message: 'Endereço não encontrado para o usuário.',
        };
      }

      const orderId = await ordersRepository.insertOrder({
        userId,
        addressId,
        status,
      });

      if (!orderId) {
        return {
          success: false,
          message: 'Pedido não cadastrado.',
        };
      }

      const orderProducts = products.map((product) => [
        orderId,
        product.product_id,
        product.quantity,
      ]);

      const isProductsInserted =
        await ordersProductsRepository.insertOrderProducts(orderProducts);

      if (isProductsInserted.affectedRows === 0) {
        return {
          success: false,
          message: 'Erro ao associar produtos ao pedido.',
        };
      }

      return {
        success: true,
        data: { id: orderId, userId, addressId, status, products },
      };
    } catch (error) {
      console.error('Erro no Service ao cadastrar pedido:', error);
      return {
        success: false,
        message: 'Erro no Service ao cadastrar pedido.',
      };
    }
  },

  editOrder: async ({ status, orderId }) => {
    try {
      const order = await ordersRepository.editById({ status, orderId });

      if (order.affectedRows === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: { id: orderId, status } };
    } catch (error) {
      console.error('Erro no Service ao atualizar pedido:', error);
      return {
        success: false,
        message: 'Erro no Service ao atualizar pedido.',
      };
    }
  },

  removeOrder: async (orderId) => {
    try {
      const order = await ordersRepository.removeById(orderId);

      if (order.affectedRows === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: { id: orderId } };
    } catch (error) {
      console.error('Erro no Service ao deletar pedido:', error);
      return {
        success: false,
        message: 'Erro no Service ao deletar pedido.',
      };
    }
  },
};
