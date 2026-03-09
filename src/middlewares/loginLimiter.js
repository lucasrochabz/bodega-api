import rateLimit from 'express-rate-limit';
import appConfig from '../config/app.js';

const { login } = appConfig.rateLimit;

export const loginLimiter = rateLimit({
  windowMs: login.windowMs,
  max: login.max,
  standardHeaders: true, // habilita RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset
  legacyHeaders: false, // desativa X-RateLimit-*

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: login.message,
    });
  },
});
