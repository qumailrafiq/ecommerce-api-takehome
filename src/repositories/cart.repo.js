const Cart = require('../models/cart.model');

class CartRepository {
  async findByUserId(userId) {
    return Cart.findOne({ userId }).populate('items.productId');
  }

  async createCart(data) {
    const cart = new Cart(data);
    return cart.save();
  }

  async saveCart(cart) {
    return cart.save();
  }

  async clearCart(userId) {
    return Cart.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0 },
      { new: true, upsert: true }
    );
  }

  async deleteCart(userId) {
    return Cart.findOneAndDelete({ userId });
  }
}

module.exports = new CartRepository();
