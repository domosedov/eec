import {
  Resolver,
  Mutation,
  Arg
} from 'type-graphql'

import { redis } from '../../../redis'
import { User } from '../../../entity/User'
import { REDIS_PREFIX_CONFIRM_USER } from '../../../constants'

@Resolver()
export class ConfirmResolver {
    @Mutation(() => Boolean)
  async confirmUser (
        @Arg('token') token: string
  ): Promise<boolean> {
    const userId = await redis.get(REDIS_PREFIX_CONFIRM_USER + token)

    if (!userId) return false

    await User.update({ id: parseInt(userId, 10) }, {
      isConfirmed: true
    })

    await redis.del(REDIS_PREFIX_CONFIRM_USER + token)

    return true
  }
}
