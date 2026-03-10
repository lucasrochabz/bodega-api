import { vi, describe, test, expect } from 'vitest';
import { ordersService } from './ordersService.js';
import { ordersRepository } from '../repositories/ordersRepository.js';

vi.mock('../repositories/ordersRepository.js');

// fix testar o retorno do service: expect(result).toEqual(resultMock);
describe('ordersService', () => {
  test('Deve chamar ordersRepository.findAllByUserId', async () => {
    const userId = '1';

    const resultMock = [];
    ordersRepository.findAllByUserId.mockResolvedValue(resultMock);

    await ordersService.getMyOrders(userId);

    expect(ordersRepository.findAllByUserId).toHaveBeenCalledWith(userId);
  });
});
