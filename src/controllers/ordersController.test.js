import { describe, expect, test, vi } from 'vitest';
import { ordersController } from './ordersController';
import { ordersService } from '../services/ordersService';

vi.mock('../services/ordersService');

describe('ordersController', () => {
  test('Deve chamar ordersService.getAllOrders', async () => {
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

  test('Deve chamar ordersService.getOrderDetails', async () => {
    const params = { orderId: '123' };
    const req = { params };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.getOrderDetails.mockResolvedValue({
      success: true,
      message: 'Pedido encontrado com sucesso.',
      data: {},
    });

    await ordersController.getOrderDetails(req, res);

    expect(ordersService.getOrderDetails).toHaveBeenCalledWith(params.orderId);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedido encontrado com sucesso.',
      data: expect.any(Object),
    });
  });

  test('Deve chamar ordersService.createOrder', async () => {
    const user = { id: '123' };
    const body = { status: 'text', products: [] };
    const req = { user, body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.createOrder.mockResolvedValue({
      success: true,
      message: 'Pedido cadastrado com sucesso.',
      data: {},
    });

    await ordersController.createOrder(req, res);

    expect(ordersService.createOrder).toHaveBeenCalledWith({
      userId: user.id,
      status: body.status,
      products: body.products,
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedido cadastrado com sucesso.',
      data: expect.any(Object),
    });
  });

  test('Deve chamar ordersService.updateOrder', async () => {
    const params = { orderId: '123' };
    const body = { status: 'status' };
    const req = { params, body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.updateOrder.mockResolvedValue({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: {},
    });

    await ordersController.updateOrder(req, res);

    expect(ordersService.updateOrder).toHaveBeenCalledWith({
      orderId: params.orderId,
      status: body.status,
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: expect.any(Object),
    });
  });

  test('Deve chamar ordersService.deleteOrder', async () => {
    const params = { orderId: '123' };
    const req = { params };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    ordersService.deleteOrder.mockResolvedValue({
      success: true,
      message: 'Pedido deletado com sucesso.',
      data: {},
    });

    await ordersController.deleteOrder(req, res);

    expect(ordersService.deleteOrder).toHaveBeenCalledWith(params.orderId);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Pedido deletado com sucesso.',
      data: expect.any(Object),
    });
  });
});
