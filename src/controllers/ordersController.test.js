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

  test('Deve chamar ordersService.getUserOrders', async () => {
    const user = { id: '1' };
    const req = { user };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.getUserOrders.mockResolvedValue({
      success: true,
      message: 'Pedido(s) encontrado(s) com sucesso.',
      data: [],
    });

    await ordersController.getUserOrders(req, res);

    expect(ordersService.getUserOrders).toHaveBeenCalledWith(user.id);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedido(s) encontrado(s) com sucesso.',
      data: expect.any(Array),
    });
  });
});
