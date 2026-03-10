import { vi, describe, test, expect } from 'vitest';
import { authService } from './authService.js';
import { usersRepository } from '../repositories/usersRepository.js';
import { compareHash } from '../utils/hashUtils.js';
import { generateToken } from '../utils/tokenUtils.js';

vi.mock('../repositories/usersRepository.js');
vi.mock('../utils/hashUtils.js');
vi.mock('../utils/tokenUtils.js');

describe('authService', () => {
  test('Deve chamar usersRepository.findByEmail', async () => {
    const email = 'teste@email.com';
    const password = '123456';

    usersRepository.findByEmail.mockResolvedValue([
      {
        id: 1,
        first_name: 'Teste',
        password: 'hashfake',
        role: 'role',
      },
    ]);
    compareHash.mockResolvedValue(true);
    generateToken.mockReturnValue('token123');

    await authService.login({ email, password });

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(email);
  });
});
