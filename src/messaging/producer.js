const { redisClient, connectRedis } = require("./redisClient");

async function sendMessageToStream(userId, content) {
  await connectRedis();

  const streamId = await redisClient.xAdd("chat_stream", "*", {
    userId: String(userId),
    content: content,
  });

  console.log("Message added to Redis stream:", streamId);

  return streamId;
}

module.exports = {
  sendMessageToStream,
};