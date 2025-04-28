const { validateInput } = require('../helpers/inputValidationHelper');

const validateUserUpdate = (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    zip_code,
    street,
    number,
    neighborhood,
    city,
    state,
  } = req.body;

  const firstNameValidate = validateInput('firstName', first_name);
  const lastNameValidate = validateInput('lastName', last_name);
  const emailValidate = validateInput('email', email);
  const passwordValidate = validateInput('password', password);
  const zipCodeValidate = validateInput('zipCode', zip_code);
  const streetValidate = validateInput('street', street);
  const numberValidate = validateInput('number', number);
  const neighborhoodValidate = validateInput('neighborhood', neighborhood);
  const cityValidate = validateInput('city', city);
  const stateValidate = validateInput('state', state);

  const errors = [];

  if (!firstNameValidate.valid) {
    errors.push({ message: firstNameValidate.message });
  }

  if (!lastNameValidate.valid) {
    errors.push({ message: lastNameValidate.message });
  }

  if (!emailValidate.valid) {
    errors.push({ message: emailValidate.message });
  }

  if (!passwordValidate.valid) {
    errors.push({ message: passwordValidate.message });
  }

  if (!zipCodeValidate.valid) {
    errors.push({ message: zipCodeValidate.message });
  }

  if (!streetValidate.valid) {
    errors.push({ message: streetValidate.message });
  }

  if (!numberValidate.valid) {
    errors.push({ message: numberValidate.message });
  }

  if (!neighborhoodValidate.valid) {
    errors.push({ message: neighborhoodValidate.message });
  }

  if (!cityValidate.valid) {
    errors.push({ message: cityValidate.message });
  }

  if (!stateValidate.valid) {
    errors.push({ message: stateValidate.message });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};

module.exports = { validateUserUpdate };
