import { verifyToken } from '../utils/tokenUtils.js';
import { handleError } from '../helpers/handleError.js';
import { AuthErrors } from '../errors/authErrors.js';

export const authenticateUser = (req, res, next) => {
  const authUser = req.headers.authorization;

  if (!authUser) {
    return sendError(res, AuthErrors.UNAUTHENTICATED);
  }

  const token = authUser.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return handleError(res, AuthErrors.INVALID_TOKEN);
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return handleError(res, AuthErrors.UNAUTHORIZED_ACCESS);
  }

  next();
};

export const authenticateWebhook = (req, res, next) => {
  const secret = req.headers['x-webhook-secret'];

  if (secret !== process.env.WEBHOOK_SECRET) {
    return handleError(res, AuthErrors.INVALID_WEBHOOK);
  }

  next();
};
