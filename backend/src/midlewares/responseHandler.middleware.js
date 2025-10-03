const  responseHandler=(req, res, next)=> {
  res.success = (apiResponse) => {
    const statusCode = res.statusCode || 200;
    return res.status(statusCode).json(apiResponse);
  };
  res.error = (
    statusCode,
    message = "Internal error Happend",
    error = [],
    success = false,
    data = null,
    stack = ""
  ) => {
    res.status(statusCode).json({
      statusCode,
      message,
      error,
      success,
      data,
      stack,
    });
  };
  next();
}

export { responseHandler };
