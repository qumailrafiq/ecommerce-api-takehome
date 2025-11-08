const Product = require('../models/product.model');

class ProductRepository {
  async create(product) {
    return Product.create(product);
  }

  async update(id, updates) {
    return Product.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }

  async findById(id) {
    return Product.findById(id);
  }

  async list({ page = 1, limit = 10, category, minPrice, maxPrice }) {
    const filter = {};
    if (category) filter.categoryId = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit || 1)
    };
  }
}

module.exports = new ProductRepository();
