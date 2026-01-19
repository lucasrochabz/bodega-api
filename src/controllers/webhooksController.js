import { ordersService } from '../services/ordersService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const webhooksController = {
  paymentWebhook: async (req, res) => {
    const secret = req.headers['x-webhook-secret'];

    if (secret !== process.env.WEBHOOK_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Usuário não autorizado.',
      });
    }

    const { event, order_id } = req.body;

    try {
      const result = await ordersService.updateOrder({ event, order_id });

      handleServiceResponse(res, result, 200);
    } catch (error) {
      console.error('Erro ao processar webhook pagamento.', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },
};
