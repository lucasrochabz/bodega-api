import { paymentEventsMapper } from '../mappers/paymentEventsMapper.js';
import { paymentsRepositoy } from '../repositories/paymentsRepositoy.js';
import { ordersService } from './ordersService.js';

export const paymentsService = {
  // fix: continuar fazendo o service
  createPayment: async (paymentData) => {
    if (!paymentData.payment_token) {
      return res.status(400).json({ error: 'Pagamento inválido.' });
    }

    const payment = paymentsRepositoy.insert(paymentData);

    return payment;
  },

  handlePaymentEvent: async ({ event, order_id, transaction_id }) => {
    const status = paymentEventsMapper[event];

    if (!status) {
      return {
        message: 'Evento de pagamento não mapeado. Ignorado.',
        data: null,
      };
    }

    const payment = await paymentsRepositoy.updateByOrderId({
      status,
      order_id,
      transaction_id,
    });

    if (payment.affectedRows === 0) {
      return {
        message: 'Evento já processado ou pedido inexistente.',
        data: { id: order_id, status },
      };
    }

    // fix: fazer mapa de status PAYMENT_STATUS
    if (status === 'paid') {
      await ordersService.markAsPaid(order_id);
    }

    return {
      id: order_id,
      status,
      event,
    };
  },
};
