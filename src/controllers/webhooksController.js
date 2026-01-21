import { ordersService } from '../services/ordersService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { sendError } from '../helpers/errorHanlder.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const webhooksController = {
  paymentWebhook: async (req, res) => {
    const { event, order_id } = req.body;
    try {
      const result = await ordersService.updateOrder({ event, order_id });

      handleServiceResponse(res, result, 200);
    } catch (error) {
      console.error('Erro ao processar webhook pagamento.', error);
      return sendError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },
};
