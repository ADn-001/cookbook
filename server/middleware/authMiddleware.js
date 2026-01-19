// Protects routes — requires valid session
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  next();
};

// Optional: also attach userId to req for convenience
const attachUser = (req, res, next) => {
  if (req.session.userId) {
    req.userId = req.session.userId;
  }
  next();
};

module.exports = { requireAuth, attachUser };