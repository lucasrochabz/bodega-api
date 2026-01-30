import bcrypt from 'bcrypt';

const generateHash = async (passwordValue, saltRounds) => {
  try {
    return await bcrypt.hash(passwordValue, saltRounds);
  } catch (error) {
    // fix: add throw error;
    console.error('Erro ao gerar o hash:', error);
    throw new Error(`Erro ao gerar o hash: ${error.message}`);
  }
};

const compareHash = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    // fix: add throw error;
    console.error('Erro ao comparar hash:', error);
    throw new Error(`Erro ao comparar hash: ${error.message}`);
  }
};

export { generateHash, compareHash };
