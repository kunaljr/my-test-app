module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    console.log('THIS IS REQUEST =>', req)
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access Denied: Insufficient role' });
    }

    next();
  };
};