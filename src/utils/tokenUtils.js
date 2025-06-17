import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateToken = (userData) => {
  try {
    return jwt.sign(
      {
        id: userData.id,
        role: userData.role,
      },
      SECRET_KEY,
      { expiresIn: '2h' },
    );
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    throw new Error(`Erro ao gerar token: ${error.message}`);
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    throw new Error(`Erro ao verificar token: ${error.message}`);
  }
};
