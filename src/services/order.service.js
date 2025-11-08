import orderRepo from '../repositories/order.repo.js';
import cartRepo from '../repositories/cart.repo.js';
import productRepo from '../repositories/product.repo.js';

class OrderService {
  async placeOrder(userId) {
    const cart = await cartRepo.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw Object.assign(new Error('Cart is empty'), { status: 400 });
    }

    // Validate stock and prepare order items
    const items = [];
    for (const it of cart.items) {
      const product = await productRepo.findById(it.productId);
      if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
      if (product.stockQuantity < it.quantity) {
        throw Object.assign(new Error(`Insufficient stock for product ${product._id}`), { status: 400 });
      }
      items.push({ productId: product._id, quantity: it.quantity, price: product.price });
    }

    // Deduct stock (sequentially; in prod use transactions)
    for (const it of items) {
      const p = await productRepo.findById(it.productId);
      p.stockQuantity = p.stockQuantity - it.quantity;
      await p.save();
    }

    const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);

    const order = await orderRepo.create({
      userId,
      items,
      totalPrice,
      status: 'placed'
    });

    // Clear cart after order
    await cartRepo.clearCart(userId);

    return order;
  }

  async getOrdersForUser(userId) {
    return orderRepo.findByUserId(userId);
  }

  async getAllOrders() {
    return orderRepo.findAll();
  }
}

export default new OrderService();
