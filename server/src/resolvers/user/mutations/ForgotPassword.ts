import {
  Resolver,
  Mutation,
  Arg, Ctx
} from 'type-graphql'

import { User } from '../../../entity/User'
import { sendEmail } from '../../../utils/sendEmail'
import { AppContext } from '../../../types/AppContext'
import { createChangePasswordUrl } from '../../../utils/createChangePasswordUrl'

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
  async forgotPassword (
        @Arg('email') email: string,
        @Ctx() ctx: AppContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) return true

    await sendEmail(email, await createChangePasswordUrl(user.id, ctx.redis))

    return true
  }
}
