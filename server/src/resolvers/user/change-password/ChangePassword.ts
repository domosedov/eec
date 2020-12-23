import {
    Resolver,
    Mutation,
    Arg, Ctx
} from "type-graphql";
import bcrypt from "bcryptjs";
import {User} from "../../../entity/User";
import {ChangePasswordInput} from "../../../inputs/ChangePasswordInput";
import {MyContext} from "../../../types/MyContext";
import {REDIS_PREFIX_FORGOT_PASSWORD} from "../../../constants";

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, {nullable: true})
    async changePassword(
        @Arg("data") {token, password}: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {

        const userId = await ctx.redis.get(REDIS_PREFIX_FORGOT_PASSWORD + token);

        console.log(userId)

        if (!userId) return null;

        const user = await User.findOne({where: {id: userId}})

        if (!user) return null;

        await ctx.redis.del(REDIS_PREFIX_FORGOT_PASSWORD + token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        return user;
    }
}
