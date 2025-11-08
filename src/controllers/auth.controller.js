const authService = require('../services/auth.service');

class AuthController {
  async register(req, res, next) {
    try {
      const payload = req.body;
      const user = await authService.register(payload);
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });
      res.json({ data });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await authService.logout(userId);
      // For stateless JWT, you may want to instruct client to delete token.
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
