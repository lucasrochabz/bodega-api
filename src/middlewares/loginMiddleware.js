const { validateInput } = require('../helpers/inputValidationHelper');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const emailValidate = validateInput('email', email);
  const passwordValidate = validateInput('password', password);

  const errors = [];

  if (!emailValidate.valid) {
    errors.push({ message: emailValidate.message });
  }

  if (!passwordValidate.valid) {
    errors.push({ message: passwordValidate.message });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};

module.exports = { validateLogin };
