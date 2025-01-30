const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyUserInDB } = require('../models/authsModel');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authsController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await verifyUserInDB({ email });

      if (!user.success) {
        return res.status(404).json({
          success: false,
          message: user.message,
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.data.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Dados inválidos',
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
        },
        SECRET_KEY,
        { expiresIn: '1h' },
      );

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso.',
        data: user.data,
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar login.',
      });
    }
  },
};

module.exports = { authsController };
