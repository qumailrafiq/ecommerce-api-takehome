const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repo');
const cartRepo = require('../repositories/cart.repo');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

class AuthService {
  async register({ name, email, password, role }) {
    email = email.toLowerCase();
    const exists = await userRepo.findByEmail(email);
    if (exists) {
      const err = new Error('Email already registered');
      err.status = 400;
      throw err;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ name, email, password: hashed, role });
    return { id: user._id, name: user.name, email: user.email, role: user.role };
  }

  async login({ email, password }) {
    email = email.toLowerCase();
    const user = await userRepo.getByIdWithPassword((await userRepo.findByEmail(email))?._id);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const payload = { id: user._id.toString(), role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return safe user data
    return {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    };
  }

  // Logout: clear cart (ties cart to user session)
  async logout(userId) {
    // clear user's cart
    await cartRepo.clearCart(userId);
    // If you use token-blocklist, you would add token to blocklist here.
    return { message: 'Logged out and cart cleared' };
  }
}

module.exports = new AuthService();
