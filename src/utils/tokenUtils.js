import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const RESET_SECRET_KEY = process.env.JWT_RESET_SECRET_KEY;

const generateToken = (userData) => {
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

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    throw new Error(`Erro ao verificar token: ${error.message}`);
  }
};

const generateResetToken = (userId) => {
  try {
    return jwt.sign({ userId }, RESET_SECRET_KEY, { expiresIn: '15m' });
  } catch (error) {
    console.error('Erro ao gerar token de recuperação:', error);
    throw new Error(`Erro ao gerar token de recuperação: ${error.message}`);
  }
};

const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, RESET_SECRET_KEY);
  } catch (error) {
    console.error('Token de redefinição inválido ou expirado:', error);
    throw new Error('Token de redefinição inválido ou expirado.');
  }
};

export { generateToken, verifyToken, generateResetToken, verifyResetToken };
