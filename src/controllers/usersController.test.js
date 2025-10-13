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
});
