const handleServiceResponse = (res, result, successStatus, failStatus) => {
  if (successStatus === undefined || failStatus === undefined) {
    throw new Error('É preciso informar o successStatus e o failStatus');
  }

  if (!result.success) {
    return res.status(failStatus).json(result);
  }
  return res.status(successStatus).json(result);
};

export default handleServiceResponse;
