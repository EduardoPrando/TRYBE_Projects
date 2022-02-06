module.exports = (error, req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ err: error.err });
} 
  return res.status(500).json({ message: 'Internal Server Error' });
};
