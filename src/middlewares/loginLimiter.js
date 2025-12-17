import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // até 10 requisições por IP nesse período
  standardHeaders: true, // habilita RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset
  legacyHeaders: false, // desativa X-RateLimit-*

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'Muitas tentativas. Tente novamente mais tarde.',
    });
  },
});
