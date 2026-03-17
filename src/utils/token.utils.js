import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const generateToken = (userData) => {
  return jwt.sign(
    {
      id: userData.id,
      role: userData.role,
    },
    authConfig.jwtSecret,
    { expiresIn: authConfig.tokenExpiresIn },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, authConfig.jwtSecret);
};

const generateResetToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    authConfig.jwtResetSecret,
    { expiresIn: authConfig.resetExpiresIn },
  );
};

const verifyResetToken = (token) => {
  return jwt.verify(token, authConfig.jwtResetSecret);
};

export { generateToken, verifyToken, generateResetToken, verifyResetToken };
