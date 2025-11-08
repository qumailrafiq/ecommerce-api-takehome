const Order = require('../models/order.model');

class OrderRepository {
  async create(order) {
    return Order.create(order);
  }

  async findByUserId(userId) {
    return Order.find({ userId }).sort({ createdAt: -1 });
  }

  async findAll() {
    return Order.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Order.findById(id);
  }
}

module.exports = new OrderRepository();
