import { vi, describe, test, expect } from 'vitest';

// fix: essa é a abordagem mais profissional pois não executa nada do service.
// vi.mock('../services/usersService.js', () => ({
//   usersService: {
//     getAllUsers: vi.fn(),
//     getUserById: vi.fn(),
//     createUser: vi.fn(),
//     updateUserById: vi.fn(),
//     deleteUserById: vi.fn(),
//   },
// }));
// vi.mock('../helpers/handleResponse.js', () => ({
//   handleResponse: vi.fn(),
// }));

vi.mock('../services/usersService.js');
vi.mock('../helpers/handleResponse.js');

import { usersService } from '../services/usersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { usersController } from './usersController.js';

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

  test('Deve chamar usersService.getUserById', async () => {
    const req = { params: { userId: '1' } };
    const res = makeRes();

    const resultMock = {};
    usersService.getUserById.mockResolvedValue(resultMock);

    await usersController.getUserById(req, res);

    expect(usersService.getUserById).toHaveBeenCalledWith(req.params.userId);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário encontrado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar usersService.createUser', async () => {
    const req = { body: { userData: {} } };
    const res = makeRes();

    const resultMock = {};
    usersService.createUser.mockResolvedValue(resultMock);

    await usersController.createUser(req, res);

    expect(usersService.createUser).toHaveBeenCalledWith(req.body.userData);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário cadastrado com sucesso.', data: resultMock },
      201,
    );
  });

  test('Deve chamar usersService.updateUserById', async () => {
    const req = {
      user: { id: '1' },
      body: {},
    };
    const res = makeRes();

    const resultMock = {};
    usersService.updateUserById.mockResolvedValue(resultMock);

    await usersController.updateUserById(req, res);

    expect(usersService.updateUserById).toHaveBeenCalledWith({
      userId: req.user.id,
      userData: req.body,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário atualizado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar usersService.deleteUserById', async () => {
    const req = { params: { userId: '1' } };
    const res = makeRes();

    const resultMock = {};
    usersService.deleteUserById.mockResolvedValue(resultMock);

    await usersController.deleteUserById(req, res);

    expect(usersService.deleteUserById).toHaveBeenCalledWith(req.params.userId);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
