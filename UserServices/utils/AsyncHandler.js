const asyncHandler = (middleware) => {
  return async function (req, res, next) {
    try {
      await middleware(req, res, next);
    } catch (e) {
      res.status(500).json({
        success: false,
        data: e.message,
        message: "Something went wrong"
      })
    }
  };
};

export default asyncHandler;
