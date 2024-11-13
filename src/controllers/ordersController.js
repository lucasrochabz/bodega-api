const { getAllOrders, getOrder } = require('../models/orders');

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
};

module.exports = { ordersController };
