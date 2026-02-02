import { ordersService } from '../services/ordersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';

export const webhooksController = {
  paymentWebhook: async (req, res) => {
    const { event, order_id } = req.body;
    try {
      const result = await ordersService.updateOrder({ event, order_id });
      return handleResponse(
        res,
        { message: 'Usuário atualizado com sucesso', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao processar webhook pagamento.', error);
      return handleError(res, error);
    }
  },
};
