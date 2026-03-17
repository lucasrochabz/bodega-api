export default {
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtResetSecret: process.env.JWT_RESET_SECRET_KEY,

  tokenExpiresIn: '2h',
  resetExpiresIn: '15m',

  bcryptSaltRounds: 10,
};
