const { createClient } = require("redis");
require("dotenv").config();

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({
  url: redisUrl,
  
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected (Redis Cloud)");
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Redis initial connect failed:", err);
  }
})();

module.exports = redisClient;
