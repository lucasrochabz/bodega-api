import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
import { addressService } from '../services/address.service.js';

export const addressController = {
  getAddress: async (req, res) => {
    const { postalCode } = req.params;

    try {
      const result = await addressService.getAddress(postalCode);
      return handleResponse(
        res,
        { message: 'Endereço encontrado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Error ao buscar endereço:', error);
      return handleError(res, error);
    }
  },
};
