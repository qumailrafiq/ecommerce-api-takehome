const productService = require('../services/product.service');

class ProductController {
  async create(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ data: product });
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const query = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice
      };
      const result = await productService.listProducts(query);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const product = await productService.getProduct(req.params.id);
      if (!product) return res.status(404).json({ message: 'Not found' });
      res.json({ data: product });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.json({ data: product });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
