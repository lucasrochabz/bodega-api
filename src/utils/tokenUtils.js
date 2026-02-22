import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const RESET_SECRET_KEY = process.env.JWT_RESET_SECRET_KEY;

const generateToken = (userData) => {
  return jwt.sign(
    {
      id: userData.id,
      role: userData.role,
    },
    SECRET_KEY,
    { expiresIn: '2h' },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const generateResetToken = (userId) => {
  return jwt.sign({ userId }, RESET_SECRET_KEY, { expiresIn: '15m' });
};

const verifyResetToken = (token) => {
  return jwt.verify(token, RESET_SECRET_KEY);
};

export { generateToken, verifyToken, generateResetToken, verifyResetToken };
