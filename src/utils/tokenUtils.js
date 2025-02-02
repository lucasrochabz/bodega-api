const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (userData) => {
  try {
    return jwt.sign(
      {
        id: userData.id,
        name: userData.name,
      },
      SECRET_KEY,
      { expiresIn: '2h' },
    );
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    throw new Error(`Erro ao gerar token: ${error.message}`);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    throw new Error(`Erro ao verificar token: ${error.module}`);
  }
};

module.exports = { generateToken, verifyToken };
