import { v4 as uuid } from 'uuid'
import { Redis } from 'ioredis'
import { CLIENT_URL, REDIS_PREFIX_CONFIRM_USER } from '../constants'

export const createConfirmationUrl = async (userId: number, redisClient: Redis) => {
  const token = uuid()

  await redisClient.set(REDIS_PREFIX_CONFIRM_USER + token, userId, 'ex', 60 * 60 * 24) // 1 day expiration

  return `${CLIENT_URL}/auth/confirm?token=${token}`
}
