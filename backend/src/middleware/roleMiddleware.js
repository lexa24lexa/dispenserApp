const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "role not found" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "access forbidden: insufficient role" });
    }

    next();
  };
};

module.exports = roleMiddleware;