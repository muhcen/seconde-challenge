module.exports = (err, req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: err.message,
    detail: err.parent.detail,
  });
};
