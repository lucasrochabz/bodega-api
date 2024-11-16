const {
  getAllOrdersFromDB,
  getOrderFromDB,
  createOrderInDB,
  updateOrder,
  deleteOrder,
} = require('../models/orders');

const ordersController = {
  listAllOrders: async (req, res) => {
    try {
      const orders = await getAllOrdersFromDB();

      if (!orders.success) {
        return res
          .status(404)
          .json({ success: false, message: orders.message });
      }

      res.status(200).json({ success: true, data: orders.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar pedidos' });
    }
  },

  getOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await getOrderFromDB(orderId);

      if (!order.success) {
        return res.status(404).json({ success: false, message: order.message });
      }

      res.status(200).json({ success: true, data: order.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar pedido' });
    }
  },

  createOrder: async (req, res) => {
    const { user_id, address_id, date, status, product_id } = req.body;
    try {
      const newOrder = await createOrderInDB({
        user_id,
        address_id,
        date,
        status,
        product_id,
      });

      if (!newOrder.success) {
        return res
          .status(404)
          .json({ success: false, message: newOrder.message });
      }

      res.status(201).json({ success: true, data: newOrder.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao cadastrar pedido' });
    }
  },

  updateOrder: async (req, res) => {
    const { product_id } = req.body;
    const { orderId } = req.params;
    try {
      const updatedOrder = await updateOrder({ product_id, orderId });

      if (!updatedOrder.success) {
        return res
          .status(404)
          .json({ success: false, message: updatedOrder.message });
      }

      res.status(200).json({ success: true, data: updatedOrder.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao atualizar pedido' });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await deleteOrder(orderId);

      if (!deletedOrder.success) {
        return res
          .status(404)
          .json({ success: false, message: deletedOrder.message });
      }

      res.status(200).json({ success: true, data: deletedOrder.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao deletar pedido' });
    }
  },
};

module.exports = { ordersController };
