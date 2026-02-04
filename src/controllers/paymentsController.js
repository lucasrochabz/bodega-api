import { handleResponse } from '../helpers/handleResponse.js';
import { paymentsService } from '../services/paymentsService.js';

export const paymentsController = {
  checkout: async (req, res) => {
    const { order_id, payment_method, gateway, payment_token } = req.body;
    try {
      const result = await paymentsService.createPayment({
        order_id,
        payment_method,
        gateway,
        payment_token,
      });
      handleResponse(
        res,
        {
          message: 'Pagamento iniciado. Aguardando confirmação.',
          data: result,
        },
        202,
      );
    } catch (error) {
      console.error(error);
    }
  },
};
