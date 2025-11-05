import { ordersService } from '../services/ordersService.js';
import handleServiceResponse from '../helpers/handleServiceResponse.js';

export const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const ordersResult = await ordersService.getAllOrders();
      handleServiceResponse(res, ordersResult, 200, 404);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedidos.',
      });
    }
  },

  getUserOrders: async (req, res) => {
    const userId = req.user.id;
    try {
      const orderResult = await ordersService.getUserOrders(userId);
      handleServiceResponse(res, orderResult, 200, 404);
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedidos do usuário.',
      });
    }
  },

  getOrderDetails: async (req, res) => {
    const { orderId } = req.params;
    try {
      const orderResult = await ordersService.getOrderDetails(orderId);
      handleServiceResponse(res, orderResult, 200, 404);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedido.',
      });
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

      handleServiceResponse(res, newOrder, 201, 404);
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar pedido.',
      });
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

      handleServiceResponse(res, updatedOrder, 200, 404);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar pedido.',
      });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await ordersService.deleteOrder(orderId);
      handleServiceResponse(res, deletedOrder, 200, 404);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedido.',
      });
    }
  },
};
