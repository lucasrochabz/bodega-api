import { vi, describe, test, expect } from 'vitest';
import { authService } from './authService';
import { usersRepository } from '../repositories/usersRepository';
import { compareHash } from '../utils/hashUtils';
import { generateToken } from '../utils/tokenUtils';

vi.mock('../repositories/usersRepository');
vi.mock('../utils/hashUtils');
vi.mock('../utils/tokenUtils');

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
