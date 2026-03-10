import { ordersService } from '../services/ordersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';

export const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const result = await ordersService.getAllOrders();
      return handleResponse(
        res,
        { message: 'Pedidos encontrados com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return handleError(res, error);
    }
  },

  getMyOrders: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await ordersService.getMyOrders(userId);
      return handleResponse(
        res,
        { message: 'Pedido(s) encontrado(s) com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      return handleError(res, error);
    }
  },

  getOrderById: async (req, res) => {
    const user = req.user;
    const { orderId } = req.params;
    try {
      const result = await ordersService.getOrderById({ user, orderId });
      return handleResponse(
        res,
        { message: 'Pedido encontrado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      return handleError(res, error);
    }
  },

  createOrder: async (req, res) => {
    const userId = req.user.id;
    const { status, products } = req.body;
    try {
      const result = await ordersService.createOrder({
        userId,
        status,
        products,
      });
      return handleResponse(
        res,
        { message: 'Pedido cadastrado com sucesso.', data: result },
        201,
      );
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
      return handleError(res, error);
    }
  },

  // fix: ver como posso esta utilizando essa rota
  updateOrder: async (req, res) => {
    try {
      const result = await ordersService.updateOrder({});
      return handleResponse(
        res,
        {
          message: '',
          data: result,
        },
        200,
      );
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      return handleError(res, error);
    }
  },

  deleteOrderById: async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await ordersService.deleteOrderById(orderId);
      return handleResponse(
        res,
        { message: 'Pedido deletado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      return handleError(res, error);
    }
  },
};
