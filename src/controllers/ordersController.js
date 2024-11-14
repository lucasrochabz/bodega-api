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

      if (!orders.success) {
        return res.status(404).json({ message: 'Pedidos não encontrados' });
      }
      res.status(200).json(orders.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
  },

  getOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await getOrder(orderId);

      if (!order.success) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.status(200).json(order.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedido' });
    }
  },

  createOrder: async (req, res) => {
    const { user_id, address_id, date, status, product_id } = req.body;
    try {
      const newOrder = await createOrder({
        user_id,
        address_id,
        date,
        status,
        product_id,
      });

      if (!newOrder.success) {
        return res.status(404).json({ message: 'Pedido não foi cadastrado' });
      }
      res.status(201).json(newOrder.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar pedido' });
    }
  },

  updateOrder: async (req, res) => {
    const { product_id } = req.body;
    const { orderId } = req.params;
    try {
      const updatedOrder = await updateOrder({ product_id, orderId });

      if (!updatedOrder.success) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.status(200).json(updatedOrder.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
  },

  deleteOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await deleteOrder(orderId);

      if (!deletedOrder.success) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
      res.status(200).json(deletedOrder.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar pedido' });
    }
  },
};

module.exports = { ordersController };
