

const errorhandler = (err, req, res, next)=>{
   console.error("Error:",err.stack);

   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({message: err.message || "Internal Server Error", stack: err.stack});
}

export {errorhandler};