import { vi, describe, test, expect } from 'vitest';
import { authController } from './authController.js';
import { authService } from '../services/authService.js';
import { handleResponse } from '../helpers/handleResponse.js';

vi.mock('../services/authService.js');
vi.mock('../helpers/handleResponse.js');

const makeRes = () => ({
  status: vi.fn(() => res),
  json: vi.fn(),
});

describe('authController', () => {
  test('Deve chamar authService.getMe', async () => {
    const user = { id: '123' };
    const req = { user };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: [],
    };

    authService.getMe.mockResolvedValue(resultMock);

    await authController.getMe(req, res);

    expect(authService.getMe).toHaveBeenCalledWith(user.id);
    expect(handleResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });

  test('Deve chamar authService.login', async () => {
    const body = { email: 'teste@email.com', password: '123456' };
    const req = { body };
    const res = makeRes();

    const fakeToken = 'fakeToken123';
    const resultMock = {
      success: true,
      message: 'Login realizado com sucesso.',
      token: fakeToken,
    };

    authService.login.mockResolvedValue(resultMock);

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith(body);
    expect(handleResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });

  test('Deve chamar authService.forgotPassword', async () => {
    const body = { email: 'teste@email.com', origin: 'http://localhost:3000' };
    const req = { body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    authService.forgotPassword.mockResolvedValue({
      success: true,
      message: 'Link de redefinição de senha gerado com sucesso.',
      resetUrl: 'http://localhost:3000',
    });

    await authController.forgotPassword(req, res);

    expect(authService.forgotPassword).toHaveBeenCalledWith({
      email: body.email,
      origin: body.origin,
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Link de redefinição de senha gerado com sucesso.',
      resetUrl: 'http://localhost:3000',
    });
  });

  test('Deve chamar authService.resetPassword', async () => {
    const query = { token: 'token123' };
    const body = { newPassword: '123456' };

    const req = { query, body };
    const res = makeRes();

    const resultMock = {
      success: true,
      message: 'Senha redefinida com sucesso.',
    };

    authService.resetPassword.mockResolvedValue(resultMock);

    await authController.resetPassword(req, res);

    expect(authService.resetPassword).toHaveBeenCalledWith({
      token: query.token,
      newPassword: body.newPassword,
    });
    expect(handleResponse).toHaveBeenCalledWith(res, resultMock, 200);
  });
});
