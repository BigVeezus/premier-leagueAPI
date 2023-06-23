import Redis from "ioredis";
import { Team } from "../model/teams";

//REDIS CONFIG
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("Redis url not defined");
}
const client = new Redis(redisUrl);
const expirationTime = 60;

export const getOrSetCache = (key: any, cb: any) => {
  return new Promise((resolve, reject) => {
    client.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const newData = await cb();
      const jsonData = JSON.stringify(newData);
      //   console.log(jsonData);
      client.set(key, jsonData, "EX", expirationTime);
      resolve(newData);
    });
  });
};
