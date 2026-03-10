import { vi, describe, test, expect } from 'vitest';
import { ordersService } from './orders.service.js';
import { ordersRepository } from '../repositories/orders.repository.js';

vi.mock('../repositories/orders.repository.js');

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
