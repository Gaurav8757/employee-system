import Redis from "ioredis";
import { config } from "dotenv";
config({ quiet: true });

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

