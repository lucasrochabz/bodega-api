import { vi, describe, test, expect } from 'vitest';
import { usersController } from './usersController.js';
import { usersService } from '../services/usersService.js';
import { handleResponse } from '../helpers/handleResponse.js';

vi.mock('../services/usersService.js');
vi.mock('../helpers/handleResponse.js');

const makeRes = () => ({});

describe('usersController', () => {
  test('Deve chamar usersService.getAllUsers', async () => {
    const req = {};
    const res = makeRes();

    const resultMock = {};
    usersService.getAllUsers.mockResolvedValue(resultMock);

    await usersController.getAllUsers(req, res);

    expect(usersService.getAllUsers).toHaveBeenCalled();
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuários encontrados com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar usersService.getUser', async () => {
    const user = { id: '1' };
    const req = { user };
    const res = makeRes();

    const resultMock = {};
    usersService.getUser.mockResolvedValue(resultMock);

    await usersController.getUser(req, res);

    expect(usersService.getUser).toHaveBeenCalledWith(user.id);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário encontrado com sucesso.', data: resultMock },
      200,
    );
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

    const resultMock = {};
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
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário cadastrado com sucesso.', data: resultMock },
      201,
    );
  });

  test('Deve chamar usersService.updateUser', async () => {
    const user = { id: '123' };
    const body = {};
    const req = { user, body };
    const res = makeRes();

    const resultMock = {};
    usersService.updateUser.mockResolvedValue(resultMock);

    await usersController.updateUser(req, res);

    expect(usersService.updateUser).toHaveBeenCalledWith({
      userId: user.id,
      userData: body,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário atualizado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar usersService.deleteUser', async () => {
    const params = { userId: '123' };
    const req = { params };
    const res = makeRes();

    const resultMock = {};
    usersService.deleteUser.mockResolvedValue(resultMock);

    await usersController.deleteUser(req, res);

    expect(usersService.deleteUser).toHaveBeenCalledWith(params.userId);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
