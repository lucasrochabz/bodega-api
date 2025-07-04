import { verifyToken } from '../utils/tokenUtils.js';

export const authenticate = (req, res, next) => {
  const authUser = req.headers.authorization;

  if (!authUser) {
    return res.status(401).json({
      success: false,
      message: 'Acesso negado. Usuário não autenticado',
    });
  }

  const token = authUser.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado',
    });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Permissões insuficientes.',
    });
  }

  next();
};
