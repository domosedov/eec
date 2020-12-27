import {
  Resolver,
  Mutation,
  Arg, Ctx
} from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../../entity/User'
import { AppContext } from '../../../types/AppContext'
import { maybeEmail } from '../../../helpers/maybe-email'

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
  async login (
        @Arg('loginOrEmail') loginOrEmail: string,
        @Arg('password') password: string,
        @Ctx() ctx: AppContext
  ): Promise<User | null> {
    let user

    if (maybeEmail(loginOrEmail)) {
      user = await User.findOne({ where: { email: loginOrEmail.toLowerCase() } })
    } else {
      user = await User.findOne({ where: { login: loginOrEmail.toLowerCase() } })
    }

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return null

    if (!user.isConfirmed) return null

    ctx.req.session.userId = user.id

    return user
  }
}
