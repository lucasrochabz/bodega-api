//  Para instalar
// npm install express-rate-limit

import rateLimit from 'express-rate-limit';

export const productsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 200, // até 10 requisições por IP nesse período
  standardHeaders: true, // habilita RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset
  legacyHeaders: false, // desativa X-RateLimit-*
  message: 'Muitas tentativas, tente novamente mais tarde.',
});
