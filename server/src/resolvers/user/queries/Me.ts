import { Ctx, Query, Resolver } from 'type-graphql'

import { User } from '../../../entity/User'
import { AppContext } from '../../../types/AppContext'

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
  async me (
        @Ctx() ctx: AppContext
  ): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }

    const id = ctx.req.session.userId

    return await User.findOne({ where: { id } })
  }
}
