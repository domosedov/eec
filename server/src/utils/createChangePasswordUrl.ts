import { v4 as uuid } from 'uuid'
import { Redis } from 'ioredis'
import { CLIENT_URL, REDIS_PREFIX_FORGOT_PASSWORD } from '../constants'

export const createChangePasswordUrl = async (userId: number, redisClient: Redis) => {
  const token = uuid()

  const isOk = await redisClient.set(
    REDIS_PREFIX_FORGOT_PASSWORD + token,
    userId,
    'ex',
    60 * 60 * 24 * 3
  ) // 3 day expiration

  if (!isOk) throw new Error('Redis: Не удалось установить значение')

  return `${CLIENT_URL}/user/change-password/${token}`
}
