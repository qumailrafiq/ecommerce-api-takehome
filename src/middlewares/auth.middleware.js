import jwt from 'jsonwebtoken';
import userRepo from '../repositories/user.repo.js';

const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info
    const user = await userRepo.findById(decoded.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      throw err;
    }
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    err.status = err.status || 401;
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    const err = new Error('Forbidden: admin only');
    err.status = 403;
    return next(err);
  }
  return next();
};

export { requireAuth, isAdmin };
