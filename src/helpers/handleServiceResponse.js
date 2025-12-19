export const handleServiceResponse = (res, result, successStatus, errorMap) => {
  if (successStatus === undefined || errorMap === undefined) {
    throw new Error('É preciso informar o successStatus e o errorMap');
  }

  if (!result.success) {
    const error = errorMap[result.error];

    if (!error) {
      return res.status(400).json({
        success: false,
        message: 'Erro de negócio não mapeado.',
      });
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(successStatus).json(result);
};
