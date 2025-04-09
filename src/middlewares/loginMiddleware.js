const { validateInput } = require('../helpers/inputValidationHelper');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const emailValidate = validateInput('email', email);
  const passwordValidate = validateInput('password', password);

  if (!emailValidate.valid || !passwordValidate.valid) {
    return res
      .status(400)
      .json({ success: false, message: 'Dados inválidos.' });
  }

  next();
};

module.exports = { validateLogin };
