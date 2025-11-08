import cartService from '../services/cart.service.js';

class CartController {
  async getCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCart(userId);
      res.json({ data: cart });
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req, res, next) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const cart = await cartService.addToCart(userId, productId, quantity || 1);
      res.status(201).json({ data: cart });
    } catch (err) {
      next(err);
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
      const { quantity } = req.body;
      const cart = await cartService.updateQuantity(userId, productId, quantity);
      res.json({ data: cart });
    } catch (err) {
      next(err);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
      const cart = await cartService.removeFromCart(userId, productId);
      res.json({ data: cart });
    } catch (err) {
      next(err);
    }
  }
}

export default new CartController();
