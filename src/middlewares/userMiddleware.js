const { validateInput } = require('../helpers/inputValidationHelper');

const validateUserUpdate = (req, res, next) => {
  const fields = [
    { key: 'first_name', label: 'firstName' },
    { key: 'last_name', label: 'lastName' },
    { key: 'email', label: 'email' },
    { key: 'password', label: 'password' },
    { key: 'zip_code', label: 'zipCode' },
    { key: 'street', label: 'street' },
    { key: 'number', label: 'number' },
    { key: 'neighborhood', label: 'neighborhood' },
    { key: 'city', label: 'city' },
    { key: 'state', label: 'state' },
  ];

  const errors = [];

  for (const { key, label } of fields) {
    const validation = validateInput(label, req.body[key]);
    if (!validation.valid) {
      errors.push({ message: validation.message });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};

module.exports = { validateUserUpdate };
