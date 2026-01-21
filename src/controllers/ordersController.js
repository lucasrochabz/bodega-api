import { ordersService } from '../services/ordersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const ordersResult = await ordersService.getAllOrders();
      handleResponse(res, ordersResult, 200);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  getUserOrders: async (req, res) => {
    const userId = req.user.id;
    try {
      const orderResult = await ordersService.getUserOrders(userId);
      handleResponse(res, orderResult, 200);
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  getOrderDetails: async (req, res) => {
    const { orderId } = req.params;
    try {
      const orderResult = await ordersService.getOrderDetails(orderId);
      handleResponse(res, orderResult, 200);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  createOrder: async (req, res) => {
    const userId = req.user.id;
    const { status, products } = req.body;
    try {
      const newOrder = await ordersService.createOrder({
        userId,
        status,
        products,
      });

      handleResponse(res, newOrder, 201);
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  updateOrder: async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await ordersService.updateOrder({
        orderId,
        status,
      });

      handleResponse(res, updatedOrder, 200);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await ordersService.deleteOrder(orderId);
      handleResponse(res, deletedOrder, 200);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },
};
