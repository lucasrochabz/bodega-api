import { vi, describe, test, expect } from 'vitest';
import { authService } from './auth.service.js';
import { usersRepository } from '../repositories/users.repository.js';
import { compareHash } from '../utils/hash.utils.js';
import { generateToken } from '../utils/token.utils.js';

vi.mock('../repositories/users.repository.js');
vi.mock('../utils/hash.utils.js');
vi.mock('../utils/token.utils.js');

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
