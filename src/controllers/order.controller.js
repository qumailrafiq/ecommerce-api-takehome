import orderService from '../services/order.service.js';

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const order = await orderService.placeOrder(userId);
      res.status(201).json({ data: order });
    } catch (err) {
      next(err);
    }
  }

  async getMyOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await orderService.getOrdersForUser(userId);
      res.json({ data: orders });
    } catch (err) {
      next(err);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({ data: orders });
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();
