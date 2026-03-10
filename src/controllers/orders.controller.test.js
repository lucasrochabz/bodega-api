import { vi, describe, test, expect } from 'vitest';

vi.mock('../services/ordersService.js');
vi.mock('../helpers/handleResponse.js');

import { ordersService } from '../services/ordersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { ordersController } from './ordersController.js';

const makeRes = () => ({});

describe('ordersController', () => {
  test('Deve chamar ordersService.getAllOrders', async () => {
    const req = {};
    const res = makeRes();

    const resultMock = [];
    ordersService.getAllOrders.mockResolvedValue(resultMock);

    await ordersController.getAllOrders(req, res);

    expect(ordersService.getAllOrders).toHaveBeenCalled();
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedidos encontrados com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.getMyOrders', async () => {
    const req = { user: { id: '1' } };
    const res = makeRes();

    const resultMock = [];
    ordersService.getMyOrders.mockResolvedValue(resultMock);

    await ordersController.getMyOrders(req, res);

    expect(ordersService.getMyOrders).toHaveBeenCalledWith(req.user.id);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido(s) encontrado(s) com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.getOrderById', async () => {
    const req = { params: {}, user: {} };
    const res = makeRes();

    const resultMock = {};
    ordersService.getOrderById.mockResolvedValue(resultMock);

    await ordersController.getOrderById(req, res);

    expect(ordersService.getOrderById).toHaveBeenCalledWith({
      user: req.user,
      orderId: req.params.orderId,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido encontrado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.createOrder', async () => {
    const req = {
      user: { id: '1' },
      body: { status: 'text', products: [] },
    };
    const res = makeRes();

    const resultMock = {};
    ordersService.createOrder.mockResolvedValue(resultMock);

    await ordersController.createOrder(req, res);

    expect(ordersService.createOrder).toHaveBeenCalledWith({
      userId: req.user.id,
      status: req.body.status,
      products: req.body.products,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido cadastrado com sucesso.', data: resultMock },
      201,
    );
  });

  test('Deve chamar ordersService.updateOrder', async () => {
    const req = {
      params: { orderId: '1' },
      body: { status: 'status' },
    };
    const res = makeRes();

    const resultMock = {};
    ordersService.updateOrder.mockResolvedValue(resultMock);

    await ordersController.updateOrder(req, res);

    expect(ordersService.updateOrder).toHaveBeenCalledWith({
      orderId: req.params.orderId,
      status: req.body.status,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Status do pedido atualizado via webhook.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.deleteOrderById', async () => {
    const req = { params: { orderId: '123' } };
    const res = makeRes();

    const resultMock = {};
    ordersService.deleteOrderById.mockResolvedValue(resultMock);

    await ordersController.deleteOrderById(req, res);

    expect(ordersService.deleteOrderById).toHaveBeenCalledWith(
      req.params.orderId,
    );
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
