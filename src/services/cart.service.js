import cartRepo from '../repositories/cart.repo.js';
import productRepo from '../repositories/product.repo.js';

class CartService {
  // Get or create cart for user
  async getCart(userId) {
    let cart = await cartRepo.findByUserId(userId);
    if (!cart) {
      cart = await cartRepo.createCart({ userId, items: [], totalPrice: 0 });
    }
    return cart;
  }

  // Add items to cart
  async addToCart(userId, productId, quantity = 1) {
    const product = await productRepo.findById(productId);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    if (product.stockQuantity < quantity) {
      const err = new Error('Insufficient stock');
      err.status = 400;
      throw err;
    }

    let cart = await cartRepo.findByUserId(userId);
    if (!cart) cart = await cartRepo.createCart({ userId, items: [], totalPrice: 0 });

    const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].subtotal = cart.items[itemIndex].quantity * product.price;
    } else {
      cart.items.push({
        productId,
        quantity,
        subtotal: product.price * quantity
      });
    }

    cart.totalPrice = cart.items.reduce((s, it) => s + it.subtotal, 0);
    return cartRepo.saveCart(cart);
  }

  async updateQuantity(userId, productId, quantity) {
    const product = await productRepo.findById(productId);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    if (product.stockQuantity < quantity) {
      const err = new Error('Insufficient stock');
      err.status = 400;
      throw err;
    }

    let cart = await cartRepo.findByUserId(userId);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) throw Object.assign(new Error('Product not in cart'), { status: 404 });

    item.quantity = quantity;
    item.subtotal = quantity * product.price;

    cart.totalPrice = cart.items.reduce((s, it) => s + it.subtotal, 0);
    return cartRepo.saveCart(cart);
  }

  async removeFromCart(userId, productId) {
    let cart = await cartRepo.findByUserId(userId);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    cart.totalPrice = cart.items.reduce((s, it) => s + it.subtotal, 0);
    return cartRepo.saveCart(cart);
  }

  async clearCart(userId) {
    return cartRepo.clearCart(userId);
  }
}

export default new CartService();
