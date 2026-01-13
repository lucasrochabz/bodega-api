import { CommonErrors } from '../errors/commonErrors.js';

// fix: remover successStatus
export const handleServiceResponse = (res, result, successStatus) => {
  if (successStatus === undefined) {
    throw new Error('É preciso informar o successStatus.');
  }

  if (result.error) {
    const defaultError = CommonErrors.UNMAPPED_BUSINESS_ERROR;
    const { statusCode, message } = result.error ?? defaultError;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  return res.status(successStatus).json({
    success: true,
    ...result,
  });
};
