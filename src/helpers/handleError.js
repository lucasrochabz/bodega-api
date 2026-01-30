export const handleError = (res, error) => {
  const { statusCode, message } = error;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
