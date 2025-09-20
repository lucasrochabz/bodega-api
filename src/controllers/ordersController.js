import { ordersService } from '../services/ordersService.js';

export const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const ordersResult = await ordersService.getAllOrders();

      if (!ordersResult.success) {
        return res.status(404).json(ordersResult);
      }

      res.status(200).json(ordersResult);
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

      if (!orderResult.success) {
        return res.status(404).json(orderResult);
      }

      res.status(200).json(orderResult);
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

      if (!orderResult.success) {
        return res.status(404).json(orderResult);
      }

      res.status(200).json(orderResult);
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

      if (!newOrder.success) {
        return res.status(404).json(newOrder);
      }

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar pedido.',
      });
    }
  },

  updateOrder: async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    try {
      const updatedOrder = await ordersService.updateOrder({
        status,
        orderId,
      });

      if (!updatedOrder.success) {
        return res.status(404).json(updatedOrder);
      }

      res.status(200).json(updatedOrder);
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

      if (!deletedOrder.success) {
        return res.status(404).json(deletedOrder);
      }

      res.status(200).json(deletedOrder);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedido.',
      });
    }
  },
};
