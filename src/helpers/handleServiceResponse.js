const handleServiceResponse = (res, result, successStatus, failStatus) => {
  if (!result.success) {
    return res.status(failStatus).json(result);
  }
  return res.status(successStatus).json(result);
};

export default handleServiceResponse;
