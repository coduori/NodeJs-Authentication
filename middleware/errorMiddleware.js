const errorHandler = (err, req, res, next) => {
  const env = process.env.NODE_ENV;
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).send({
    message: err.message,
    stack: env === "development" ? err.stack : null,
  });
};
export { errorHandler };
