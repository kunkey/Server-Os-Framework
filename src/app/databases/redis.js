"use strict";

const redis = require("redis");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require("@Env");

const redisInstance = new Array();


redisInstance[0] = redis.createClient({
  socket: { host: REDIS_HOST, port: REDIS_PORT },
  password: REDIS_PASSWORD, username: ""
});
redisInstance[1] = redisInstance[0].duplicate();

/****
 * redisInstance item 0 is Publiser
 * redisInstance item 1 is Subcriber
 */

Promise.all(redisInstance.map((Instance) => {
  Instance.connect();
})).then(() => {
  console.log('\x1b[32m%s\x1b[0m', `>>> Connected Redis Cache!`);
}).catch(error => {
  console.log(`>>> Redis : ${error}`);
});

module.exports = {
  Instance: redisInstance,
  encode: (data) => {
    return JSON.stringify(data);
  },
  decode: (data) => {
    return JSON.parse(data);
  },
  set: async (key, value) => {
    await redisInstance.set(key, JSON.stringify(value));
    //await redisInstance.quit();
  },
  setex: async (key, time, value) => {
    await redisInstance.setex(key, time, JSON.stringify(value));
    //await redisInstance.quit();
  },
  get: async (key) => {
    let exportData;
    const data = await redisInstance.get(key);
    exportData = JSON.parse(data);
    //redisInstance.quit();
    return exportData;
  },
  delete: async (key) => {
    await redisInstance.del(key);
    //await redisInstance.quit();
  }
};
