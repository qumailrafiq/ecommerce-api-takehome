const User = require('../models/user.model');

class UserRepository {
  async createUser(payload) {
    const user = await User.create(payload);
    return user;
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(id) {
    return User.findById(id).select('-password');
  }

  async getByIdWithPassword(id) {
    return User.findById(id); // includes password
  }

  async getAll() {
    return User.find().select('-password');
  }
}

module.exports = new UserRepository();
