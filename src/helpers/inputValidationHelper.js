const validationRules = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Email inválido.',
  },
  password: {
    regex: /^.{1,15}$/,
    message: 'Senha inválida.',
  },
};

const validateInput = (fieldName, value) => {
  const rule = validationRules[fieldName];

  if (!rule.regex.test(value)) {
    return { valid: false, message: rule.message };
  }
  return { valid: true };
};

module.exports = { validateInput };
