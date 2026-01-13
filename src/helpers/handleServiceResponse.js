// fix: remover successStatus
export const handleServiceResponse = (res, result, successStatus) => {
  if (successStatus === undefined) {
    throw new Error('É preciso informar o successStatus.');
  }

  if (!result.success) {
    const { statusCode, message } = result.error ?? {
      statusCode: 500,
      message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    };

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  return res.status(successStatus).json(result);
};
