export default {
  rateLimit: {
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutos,
      max: 10, // até 10 requisições por IP nesse período
      message: 'Muitas tentativas. Tente novamente mais tarde.',
    },
  },
};
