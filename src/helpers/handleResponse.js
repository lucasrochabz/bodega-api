import { CommonErrors } from '../errors/commonErrors.js';

export const handleResponse = (res, result, successStatus) => {
  // fix: nullish check cobre undefined e null (anotar)
  if (successStatus == null || result == null) {
    throw new Error('É preciso informar o successStatus e/ou result.');
  }

  return res.status(successStatus).json({
    success: true,
    ...result,
  });
};
