const { Message } = require("../models");

class MessageRepository {
  async createMessage({ userId, content }) {
    return Message.create({ userId, content });
  }

  async getMessagesByUser(userId) {
    return Message.findAll({ where: { userId } });
  }

  async getAllMessages() {
    return Message.findAll();
  }
}

module.exports = new MessageRepository();