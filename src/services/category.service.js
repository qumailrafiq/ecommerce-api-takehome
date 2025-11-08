import categoryRepo from '../repositories/category.repo.js';

class CategoryService {
  async createCategory(data) {
    const existing = await categoryRepo.findAll();
    const exists = existing.find(
      (cat) => cat.name.toLowerCase() === data.name.toLowerCase()
    );
    if (exists) {
      const err = new Error('Category already exists');
      err.status = 400;
      throw err;
    }
    return await categoryRepo.create(data);
  }

  async getCategories() {
    return await categoryRepo.findAll();
  }

  async deleteCategory(id) {
    const category = await categoryRepo.findById(id);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
    return await categoryRepo.delete(id);
  }
}

export default new CategoryService();
