const messageRepository = require("../repositories/messageRepository");

class MessageService {
  createMessage(data) {
    return messageRepository.createMessage({
      userId: data.userId,
      content: data.content,
    });
  }

  getMessagesByUser(userId) {
    return messageRepository.getMessagesByUser(userId);
  }

  getAllMessages() {
    return messageRepository.getAllMessages();
  }
}

module.exports = new MessageService();