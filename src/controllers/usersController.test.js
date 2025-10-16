import { vi, describe, test, expect } from 'vitest';
import { usersController } from './usersController';
import { usersService } from '../services/usersService';

vi.mock('../services/usersService');

describe('usersController', () => {
  test('Deve chamar usersService.getAllUsers', async () => {
    const req = {};
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    usersService.getAllUsers.mockResolvedValue({ success: true });

    await usersController.getAllUsers(req, res);

    expect(usersService.getAllUsers).toHaveBeenCalled();

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  test('Deve chamar usersService.getUser', async () => {
    const user = { id: '123' };
    const req = { user };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    usersService.getUser.mockResolvedValue({
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: [],
    });

    await usersController.getUser(req, res);

    expect(usersService.getUser).toHaveBeenCalledWith(user.id);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: expect.any(Array),
    });
  });
});
