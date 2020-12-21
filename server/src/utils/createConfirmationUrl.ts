import {v4 as uuid} from 'uuid'
import {Redis} from "ioredis";
import {confirmUserPrefix} from "../constants";

export const createConfirmationUrl = async (userId: number, redisClient: Redis) => {

    const token = uuid();

    await redisClient.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24) // 1 day expiration

    return `http://localhost:3000/user/confirm/${token}`;
}