const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../models/orders');

const ordersController = {
  lisAllOrders: async (req, res) => {
    try {
      const orders = await getAllOrders();

      if (orders.length === 0) {
        return res.status(404).json({ message: 'Pedidos não encontrados' });
      }
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
  },

  getOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await getOrder(orderId);

      if (order.length === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedido' });
    }
  },

  createOrder: async (req, res) => {
    const { user_id, address_id, date, status, product_id } = req.body;
    try {
      const order = await createOrder({
        user_id,
        address_id,
        date,
        status,
        product_id,
      });

      if (order.affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não foi cadastrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar pedido' });
    }
  },

  updateOrder: async (req, res) => {
    const { product_id } = req.body;
    const { orderId } = req.params;
    try {
      const updatedOrder = updateOrder({ product_id, orderId });

      if (updatedOrder.affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await deleteOrder(orderId);

      if (order.affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar pedido' });
    }
  },
};

module.exports = { ordersController };
