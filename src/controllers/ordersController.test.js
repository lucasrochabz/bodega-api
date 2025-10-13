import { describe, expect, test, vi } from 'vitest';
import { ordersController } from './ordersController';
import { ordersService } from '../services/ordersService';

vi.mock('../services/ordersService');

describe('ordersController', () => {
  test('Deve chamar ordersService.getAllOrders e Retornar sucesso', async () => {
    const req = {};
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.getAllOrders.mockResolvedValue({
      success: true,
      message: 'Pedidos encontrados com sucesso.',
      data: [],
    });

    await ordersController.getAllOrders(req, res);

    expect(ordersService.getAllOrders).toHaveBeenCalled();

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedidos encontrados com sucesso.',
      data: expect.any(Array),
    });
  });
});
