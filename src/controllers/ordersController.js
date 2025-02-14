const { ordersService } = require('../services/ordersService');

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await ordersService.fetchAllOrders();

      if (!orders.success) {
        return res.status(404).json({
          success: false,
          message: orders.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedidos encontrados com sucesso.',
        data: orders.data,
      });
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
      const order = await ordersService.fetchUserOrders(userId);

      if (!order.success) {
        return res.status(404).json({
          success: false,
          message: order.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedido(s) encontrado(s) com sucesso.',
        data: order.data,
      });
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
      const order = await ordersService.fetchOrderDetails(orderId);

      if (!order.success) {
        return res.status(404).json({
          success: false,
          message: order.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedido encontrado com sucesso.',
        data: order.data,
      });
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
      const newOrder = await ordersService.createOrderInDB({
        userId,
        status,
        products,
      });

      if (!newOrder.success) {
        return res.status(404).json({
          success: false,
          message: newOrder.message,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Pedido cadastrado com sucesso.',
        data: newOrder.data,
      });
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar pedido.',
      });
    }
  },

  updateOrder: async (req, res) => {
    const { product_id } = req.body;
    const { orderId } = req.params;
    try {
      const updatedOrder = await ordersService.updateOrderInDB({
        product_id,
        orderId,
      });

      if (!updatedOrder.success) {
        return res.status(404).json({
          success: false,
          message: updatedOrder.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedido atualizado com sucesso',
        data: updatedOrder.data,
      });
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
      const deletedOrder = await ordersService.deleteOrderInDB(orderId);

      if (!deletedOrder.success) {
        return res.status(404).json({
          success: false,
          message: deletedOrder.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedido deletado com sucesso.',
        data: deletedOrder.data,
      });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedido.',
      });
    }
  },
};

module.exports = { ordersController };
