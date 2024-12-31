const {
  getAllOrdersFromDB,
  getOrderFromDB,
  createOrderInDB,
  updateOrderInDB,
  deleteOrderInDB,
} = require('../models/ordersModel');

const ordersController = {
  listAllOrders: async (req, res) => {
    try {
      const orders = await getAllOrdersFromDB();

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
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar pedidos.' });
    }
  },

  getOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await getOrderFromDB(orderId);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedido.',
      });
    }
  },

  createOrder: async (req, res) => {
    const { user_id, address_id, date, status } = req.body;
    try {
      const newOrder = await createOrderInDB({
        user_id,
        address_id,
        date,
        status,
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
      const updatedOrder = await updateOrderInDB({ product_id, orderId });

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
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar pedido.',
      });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await deleteOrderInDB(orderId);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedido.',
      });
    }
  },
};

module.exports = { ordersController };
