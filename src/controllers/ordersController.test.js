import { describe, expect, test, vi } from 'vitest';
import { ordersController } from './ordersController.js';
import { ordersService } from '../services/ordersService.js';
import { handleResponse } from '../helpers/handleResponse.js';

vi.mock('../services/ordersService.js');
vi.mock('../helpers/handleResponse.js');

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
    const user = { id: '1' };

    const req = { user };
    const res = makeRes();

    const resultMock = [];
    ordersService.getMyOrders.mockResolvedValue(resultMock);

    await ordersController.getMyOrders(req, res);

    expect(ordersService.getMyOrders).toHaveBeenCalledWith(user.id);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido(s) encontrado(s) com sucesso.', data: resultMock },
      200,
    );
  });

  // fix: corrigir esse teste depois
  test('Deve chamar ordersService.getOrderDetails', async () => {
    const user = '1';
    const params = { orderId: '1' };

    const req = { params };
    const res = makeRes();

    const resultMock = {};
    ordersService.getOrderDetails.mockResolvedValue(resultMock);

    await ordersController.getOrderDetails(req, res);

    expect(ordersService.getOrderDetails).toHaveBeenCalledWith({
      user: user,
      orderId: params.orderId,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido encontrado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.createOrder', async () => {
    const user = { id: '123' };
    const body = { status: 'text', products: [] };

    const req = { user, body };
    const res = makeRes();

    const resultMock = {};
    ordersService.createOrder.mockResolvedValue(resultMock);

    await ordersController.createOrder(req, res);

    expect(ordersService.createOrder).toHaveBeenCalledWith({
      userId: user.id,
      status: body.status,
      products: body.products,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido cadastrado com sucesso.', data: resultMock },
      201,
    );
  });

  test('Deve chamar ordersService.updateOrder', async () => {
    const params = { orderId: '123' };
    const body = { status: 'status' };

    const req = { params, body };
    const res = makeRes();

    const resultMock = {};
    ordersService.updateOrder.mockResolvedValue(resultMock);

    await ordersController.updateOrder(req, res);

    expect(ordersService.updateOrder).toHaveBeenCalledWith({
      orderId: params.orderId,
      status: body.status,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Status do pedido atualizado via webhook.', data: resultMock },
      200,
    );
  });

  test('Deve chamar ordersService.deleteOrder', async () => {
    const params = { orderId: '123' };

    const req = { params };
    const res = makeRes();

    const resultMock = {};
    ordersService.deleteOrder.mockResolvedValue(resultMock);

    await ordersController.deleteOrder(req, res);

    expect(ordersService.deleteOrder).toHaveBeenCalledWith(params.orderId);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Pedido deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
