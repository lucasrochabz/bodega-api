import { ordersService } from '../services/ordersService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { OrdersErrors } from '../errors/ordersErrors.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const ordersResult = await ordersService.getAllOrders();
      handleServiceResponse(res, ordersResult, 200, OrdersErrors);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  getUserOrders: async (req, res) => {
    const userId = req.user.id;
    try {
      const orderResult = await ordersService.getUserOrders(userId);
      handleServiceResponse(res, orderResult, 200, OrdersErrors);
    } catch (error) {
      console.error('Erro ao buscar pedidos do usuário:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  getOrderDetails: async (req, res) => {
    const { orderId } = req.params;
    try {
      const orderResult = await ordersService.getOrderDetails(orderId);
      handleServiceResponse(res, orderResult, 200, OrdersErrors);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
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

      handleServiceResponse(res, newOrder, 201, OrdersErrors);
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
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

      handleServiceResponse(res, updatedOrder, 200, OrdersErrors);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await ordersService.deleteOrder(orderId);
      handleServiceResponse(res, deletedOrder, 200, OrdersErrors);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },
};
