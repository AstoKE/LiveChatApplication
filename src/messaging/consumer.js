const { redisClient, connectRedis } = require("./redisClient");
const messageService = require("../services/messageService");

const STREAM_NAME = "chat_stream";
const GROUP_NAME = "chat_group";
const CONSUMER_NAME = "consumer1";

async function setupConsumerGroup() {
  await connectRedis();

  try {
    await redisClient.xGroupCreate(STREAM_NAME, GROUP_NAME, "0", {
      MKSTREAM: true,
    });
    console.log(`Consumer Group '${GROUP_NAME}' created.`);
  } catch (err) {
    if (err.message.includes("BUSYGROUP")) {
      console.log(`Consumer Group '${GROUP_NAME}' already exists.`);
    } else {
      console.error("XGROUP CREATE Error:", err);
    }
  }
}

async function startConsumer() {
  await setupConsumerGroup();

  console.log(`Consumer '${CONSUMER_NAME}' is now listening...`);

  while (true) {
    try {
      const response = await redisClient.xReadGroup(
        GROUP_NAME,
        CONSUMER_NAME,
        [{ key: STREAM_NAME, id: ">" }],
        { COUNT: 1, BLOCK: 5000 }
      );

      if (!response) {
        continue;
      }

      const messages = response[0].messages;

      for (const msg of messages) {
        const fields = msg.message;
        const userId = fields.userId;
        const content = fields.content;

        console.log("📥 Received Message From Stream:", msg.id, fields);

        // DB'ye yaz
        await messageService.createMessage({ userId, content });

        // Mesaj işlendi → ACK gönder
        await redisClient.xAck(STREAM_NAME, GROUP_NAME, msg.id);

        console.log("✔ Message saved & acknowledged:", msg.id);
      }
    } catch (err) {
      console.error("Consumer Error:", err);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
}

startConsumer();