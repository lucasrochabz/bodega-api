export const paymentsService = {
  // fix: continuar fazendo o service
  createPayment: async (paymentData) => {
    if (!paymentData.payment_token) {
      return res.status(400).json({ error: 'Pagamento inválido.' });
    }
    return;
  },
};
