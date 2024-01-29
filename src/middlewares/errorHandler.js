export const errorHandler = (error, req, res, next) => {
    console.log(`error ${error.message}`);
    const status = error.statusCode || 400;
    res.status(status).send(error.message);
  };

  