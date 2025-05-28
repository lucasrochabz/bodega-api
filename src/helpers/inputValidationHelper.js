const validationRules = {
  firstName: {
    regex: /^[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+$/,
    message: 'Nome inválido.',
  },
  lastName: {
    regex: /^[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]{1,}(?:\s[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+)*$/,
    message: 'Sobrenome inválido.',
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Email inválido.',
  },
  password: {
    regex: /^.{1,15}$/,
    message: 'Senha inválida.',
  },
  zipCode: {
    regex: /^\d{8}$/,
    message: 'CEP inválido.',
  },
  street: {
    regex: /^[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+(\s[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+)*$/,
    message: 'Logradouro inválido.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Número inválido.',
  },
  neighborhood: {
    regex: /^[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+(\s[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+)*$/,
    message: 'Bairro inválido.',
  },
  city: {
    regex: /^[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+(\s[a-zA-Zá-úÁ-Úã-õÃ-ÕçÇ]+)*$/,
    message: 'Cidade inválida.',
  },
  state: {
    regex: /^[a-zA-Z]{2}$/,
    message: 'Estado inválido.',
  },
  orderStatus: {
    regex: /^(rascunho|aguardando pagamento|pagamento efetuado|concluido)$/,
    message: 'Status do pedido inválido.',
  },
};

const validateInput = (fieldName, value) => {
  const rule = validationRules[fieldName];

  if (!rule) {
    return { valid: false, message: `Campo ${fieldName} não é reconhecido.` };
  }

  const stringValue = String(value ?? '').trim();

  if (!rule.regex.test(stringValue)) {
    return { valid: false, message: rule.message };
  }
  return { valid: true };
};

module.exports = { validateInput };
