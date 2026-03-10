import { paymentsService } from '../services/paymentsService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';

export const webhooksController = {
  paymentWebhook: async (req, res) => {
    const { event, order_id, transaction_id } = req.body;
    try {
      const result = await paymentsService.handlePaymentEvent({
        event,
        order_id,
        transaction_id,
      });
      return handleResponse(
        res,
        { message: 'Pagamento atualizado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao processar webhook pagamento.', error);
      return handleError(res, error);
    }
  },
};
