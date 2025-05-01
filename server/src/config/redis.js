const { Redis } = require("ioredis");
require("dotenv").config();

const client = new Redis(process.env.UPSTATSH_REDIS_URL);

(async () => {
  try {
    await client.set("foo", "bar");
    console.log("Redis connected and key set!");
  } catch (error) {
    console.log("Redis err", error.message);
  }
})();

module.exports = client;
