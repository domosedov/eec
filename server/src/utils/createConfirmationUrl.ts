import { v4 as uuid } from 'uuid'
import { Redis } from 'ioredis'
import { CLIENT_URL, REDIS_PREFIX_CONFIRM_USER } from '../constants'

export const createConfirmationUrl = async (userId: number, redisClient: Redis) => {
  const token = uuid()

  const isOk = await redisClient.set(
    REDIS_PREFIX_CONFIRM_USER + token,
    userId,
    'ex',
    60 * 60 * 24 * 7) // 7 days expiration

  if (!isOk) throw new Error('Redis: Не удалось установить значение')

  return `${CLIENT_URL}/user/confirm?token=${token}`
}
