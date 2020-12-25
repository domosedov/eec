import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../../entity/User'
import { RegisterInput } from '../inputs/RegisterInput'
import { isAuth } from '../../../middlewares/isAuth'
import { createConfirmationUrl } from '../../../utils/createConfirmationUrl'
import { sendEmail } from '../../../utils/sendEmail'
import { AppContext } from '../../../types/AppContext'

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth)
    @Query(() => String)
  async hello () {
    return 'Hello World!'
  }

    @Query(() => String)
    async helloWorld () {
      return 'Hello World!'
    }

    @Mutation(() => User)
    async register (
        @Ctx() ctx: AppContext,
        @Arg('data') { email, login, password }: RegisterInput
    ): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
        login,
        email,
        password: hashedPassword
      }).save()

      await sendEmail(email, await createConfirmationUrl(user.id, ctx.redis))

      ctx.req.session.userId = user.id

      return user
    }
}
