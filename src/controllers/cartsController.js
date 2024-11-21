const { addToCartFromDB } = require('../models/carts');

const cartsController = {
  getCarts: async (req, res) => {
    try {
      const carts = await addToCartFromDB();

      if (!carts.success) {
        return res.status(404).json({
          success: false,
          message: carts.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Pedidos encontrado com sucesso.',
        data: carts.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar pedidos.' });
    }
  },
};

module.exports = { cartsController };
