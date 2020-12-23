import {
    Resolver,
    Mutation,
    Arg, Ctx
} from "type-graphql";

import {User} from "../../../entity/User";
import {sendEmail} from "../../../utils/sendEmail";
import {v4 as uuid} from "uuid";
import {MyContext} from "../../../types/MyContext";
import {REDIS_PREFIX_FORGOT_PASSWORD} from "../../../constants";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() ctx: MyContext
    ): Promise<boolean> {

        const user = await User.findOne({where: {email}});

        if (!user) return true;

        const token = uuid();

        await ctx.redis.set(REDIS_PREFIX_FORGOT_PASSWORD + token, user.id, "ex", 60 * 60 * 24) // 1 day expiration

        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

        return true;
    }
}
