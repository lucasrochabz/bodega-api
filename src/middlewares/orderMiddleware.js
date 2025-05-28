import validateInput from '../helpers/inputValidationHelper.js';

export const validateOrder = (req, res, next) => {
  const { status } = req.body;

  const validateOrderStatus = validateInput('orderStatus', status);

  const errors = [];

  if (!validateOrderStatus.valid) {
    errors.push({ message: validateOrderStatus.message });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};
