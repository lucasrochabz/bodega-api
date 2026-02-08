import { CommonErrors } from '../errors/commonErrors.js';

export const handleError = (res, error) => {
  if (
    !error ||
    typeof error !== 'object' ||
    typeof error.statusCode !== 'number'
  ) {
    const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  const { statusCode, message } = error;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
