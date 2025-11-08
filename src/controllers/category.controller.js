import categoryService from '../services/category.service.js';

class CategoryController {
  async create(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({ data: category });
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      res.json({ data: categories });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
