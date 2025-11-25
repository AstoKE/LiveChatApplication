const { User } = require("../models");

class UserRepository {
  async createUser(username) {
    return User.create({ username });
  }

  async getAllUsers() {
    return User.findAll();
  }

  async getById(id) {
    return User.findByPk(id);
  }

  async deleteUser(id) {
    return User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();