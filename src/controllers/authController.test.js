import { vi, describe, test, expect } from 'vitest';
import { authController } from './authController.js';
import { authService } from '../services/authService.js';
import { handleResponse } from '../helpers/handleResponse.js';

vi.mock('../services/authService.js');
vi.mock('../helpers/handleResponse.js');

const makeRes = () => ({});

describe('authController', () => {
  test('Deve chamar authService.getMe', async () => {
    const user = { id: '123' };

    const req = { user };
    const res = makeRes();

    const resultMock = {};
    authService.getMe.mockResolvedValue(resultMock);

    await authController.getMe(req, res);

    expect(authService.getMe).toHaveBeenCalledWith(user.id);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Usuário encontrado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar authService.login', async () => {
    const body = { email: 'teste@email.com', password: '123456' };

    const req = { body };
    const res = makeRes();

    const fakeToken = 'fakeToken123';
    const resultMock = fakeToken;
    authService.login.mockResolvedValue(resultMock);

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith(body);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Login realizado com sucesso.', token: resultMock },
      200,
    );
  });

  test('Deve chamar authService.forgotPassword', async () => {
    const body = { email: 'teste@email.com', origin: 'http://localhost:3000' };

    const req = { body };
    const res = makeRes();

    const fakeResetToken = 'fakeResetToken123';
    const resultMock = fakeResetToken;
    authService.forgotPassword.mockResolvedValue(resultMock);

    await authController.forgotPassword(req, res);

    expect(authService.forgotPassword).toHaveBeenCalledWith({
      email: body.email,
      origin: body.origin,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      {
        message:
          'Se o e-mail estiver cadastrado, enviaremos um link de redefinição.',
        token: resultMock,
      },
      200,
    );
  });

  test('Deve chamar authService.resetPassword', async () => {
    const query = { token: 'token123' };
    const body = { newPassword: '123456' };

    const req = { query, body };
    const res = makeRes();

    authService.resetPassword.mockResolvedValue();

    await authController.resetPassword(req, res);

    expect(authService.resetPassword).toHaveBeenCalledWith({
      token: query.token,
      newPassword: body.newPassword,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Senha redefinida com sucesso.' },
      200,
    );
  });
});
