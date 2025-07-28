module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  
  return res.status(500).json({
    message: err.message || 'Server Error',
  });
};