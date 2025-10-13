import { vi, describe, test, expect } from 'vitest';
import { authController } from './authController';
import { authService } from '../services/authService';

vi.mock('../services/authService');

describe('authController', () => {
  test('Deve chamar authService.login', async () => {
    const body = { email: 'teste@email.com', password: '123456' };
    const req = { body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    authService.login.mockResolvedValue({ success: true });

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith(body);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  test('Deve chamar authService.forgotPassword', async () => {
    const body = { email: 'teste@email.com' };
    const req = { body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    authService.forgotPassword.mockResolvedValue({ success: true });

    await authController.forgotPassword(req, res);

    expect(authService.forgotPassword).toHaveBeenCalledWith(body.email);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});
