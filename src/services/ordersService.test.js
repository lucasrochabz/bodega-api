import { vi, describe, test, expect } from 'vitest';
import { ordersService } from './ordersService';
import { ordersRepository } from '../repositories/ordersRepository';

vi.mock('../repositories/ordersRepository');

describe('ordersService', () => {
  test('Deve chamar ordersRepository.findAllByUserId', async () => {
    const userId = '123';

    ordersRepository.findAllByUserId.mockResolvedValue([
      {
        id: 10,
        name: 'Notebook',
        status: 'pagamento efetuado',
        image_path: 'notebook-1.jpg',
        created_at: '2025-09-21T03:27:03.000Z',
      },
    ]);

    await ordersService.getUserOrders(userId);

    expect(ordersRepository.findAllByUserId).toHaveBeenCalledWith(userId);
  });
});
