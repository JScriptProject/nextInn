const errorhandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  console.log("Error handler called", err);
  // multer file size limit

    if(err.code === "LIMIT_FILE_SIZE")
    {
        statusCode=400;
        message= "File size too large";
    }

    //mongoose validation error

    if(err.name === "ValidationError")
    {
        statusCode = 400;
        message="Validation failed from mongoose";
    }

    //mongoose cast error

    if(err.name ==="CastError")
    {
        statusCode= 400;
        message="Invalid resource id";
    }

    //Duplicate key
    if(err.code === 11000)
    {
      statusCode= 409;
      message="Duplicate Value";

    }

    //JWT error
    if(err.name === "JsonWebTokenError")
    {
        statusCode = 401;
        message = "Invalid token";
    }

    if(err.name === "TokenExpiredError")
    {
        statusCode = 401;
        message ="Token expired";
    }

  res
    .status(statusCode)
    .json({
      statusCode,
      message,
      success: false,
      data: null,
      error: err || null,
      stack: err.stack || null,
    });
};

export { errorhandler };
