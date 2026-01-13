import { vi, describe, test, expect } from 'vitest';
import { usersController } from './usersController';
import { usersService } from '../services/usersService';
import { handleServiceResponse } from '../helpers/handleServiceResponse';

vi.mock('../services/usersService');
vi.mock('../helpers/handleServiceResponse');
vi.mock('../errors/usersErrors');

const makeRes = () => ({
  status: vi.fn(() => res),
  json: vi.fn(),
});

describe('usersController', () => {
  test('Deve chamar usersService.getAllUsers', async () => {
    const req = {};
    const res = makeRes();

    const resultMock = {
      success: true,
    };

    usersService.getAllUsers.mockResolvedValue(resultMock);

    await usersController.getAllUsers(req, res);

    expect(usersService.getAllUsers).toHaveBeenCalled();

    expect(handleServiceResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });

  test('Deve chamar usersService.getUser', async () => {
    const user = { id: '123' };
    const req = { user };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: [],
    };

    usersService.getUser.mockResolvedValue(resultMock);

    await usersController.getUser(req, res);

    expect(usersService.getUser).toHaveBeenCalledWith(user.id);
    expect(handleServiceResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });

  test('Deve chamar usersService.createUser', async () => {
    const body = {
      firstName: 'Name',
      lastName: 'Teste',
      email: 'teste@email.com',
      password: '123456',
      zipCode: '60000000',
      street: 'Rua Teste',
      number: '123',
      neighborhood: 'Bairro',
      city: 'Cidade',
      state: 'Estado',
    };
    const req = { body };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Usuário cadastrado com sucesso.',
      data: {
        id: '123',
        first_name: 'Name',
        last_name: 'Teste',
        email: 'teste@email.com',
        zip_code: '60000000',
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro',
        city: 'Cidade',
        state: 'Estado',
      },
    };

    usersService.createUser.mockResolvedValue(resultMock);

    await usersController.createUser(req, res);

    expect(usersService.createUser).toHaveBeenCalledWith({
      first_name: 'Name',
      last_name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
      zip_code: '60000000',
      street: 'Rua Teste',
      number: '123',
      neighborhood: 'Bairro',
      city: 'Cidade',
      state: 'Estado',
    });
    expect(handleServiceResponse).toHaveBeenCalledWith(res, resultMock, 201);
  });

  test('Deve chamar usersService.updateUser', async () => {
    const user = { id: '123' };
    const body = {};
    const req = { user, body };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: {},
    };

    usersService.updateUser.mockResolvedValue(resultMock);

    await usersController.updateUser(req, res);

    expect(usersService.updateUser).toHaveBeenCalledWith({
      userId: user.id,
      userData: body,
    });
    expect(handleServiceResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });

  test('Deve chamar usersService.deleteUser', async () => {
    const params = { userId: '123' };
    const req = { params };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Usuário deletado com sucesso.',
      data: {},
    };

    usersService.deleteUser.mockResolvedValue(resultMock);

    await usersController.deleteUser(req, res);

    expect(usersService.deleteUser).toHaveBeenCalledWith(params.userId);
    expect(handleServiceResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });
});
