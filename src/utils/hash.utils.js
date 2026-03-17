import bcrypt from 'bcrypt';

const generateHash = (passwordValue, saltRounds) => {
  return bcrypt.hash(passwordValue, saltRounds);
};

const compareHash = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { generateHash, compareHash };
