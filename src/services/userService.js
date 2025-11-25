const userRepository = require("../repositories/userRepository");

class UserService {
  createUser(data) {
    return userRepository.createUser(data.username);
  }

  getUsers() {
    return userRepository.getAllUsers();
  }

  getUserById(id) {
    return userRepository.getById(id);
  }

  deleteUser(id) {
    return userRepository.deleteUser(id);
  }
}

module.exports = new UserService();