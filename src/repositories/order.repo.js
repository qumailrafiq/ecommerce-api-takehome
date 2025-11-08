import Order from '../models/order.model.js';

class OrderRepository {
  async create(order) {
    return Order.create(order);
  }

  async findByUserId(userId) {
    return Order.find({ userId }).sort({ createdAt: -1 }).populate('items.productId');
  }

  async findAll() {
    return Order.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Order.findById(id);
  }
}

export default new OrderRepository();
