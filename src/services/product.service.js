const productRepo = require('../repositories/product.repo');

class ProductService {
  async createProduct(payload) {
    return productRepo.create(payload);
  }

  async updateProduct(id, updates) {
    return productRepo.update(id, updates);
  }

  async deleteProduct(id) {
    return productRepo.delete(id);
  }

  async getProduct(id) {
    return productRepo.findById(id);
  }

  async listProducts(query) {
    return productRepo.list(query);
  }
}

module.exports = new ProductService();
