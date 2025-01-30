const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const authUser = req.headers.authorization;

  if (!authUser) {
    return res.status(401).json({
      success: false,
      message: 'Acesso negado. Usuário não autenticado',
    });
  }

  const token = authUser.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado',
    });
  }
};

module.exports = authenticate;
