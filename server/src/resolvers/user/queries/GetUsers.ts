import { Role } from '../../enums/Role.enum'
import { Arg, ID, Query, Resolver } from 'type-graphql'
import { User } from '../../../entity/User'

@Resolver()
export class GetUserResolver {
    @Query(() => [User])
  async users (): Promise<User[]> {
    return User.find()
  }

    @Query(() => User, { nullable: true })
    async user (@Arg('id', () => ID, {
      defaultValue: 1
    }) id: number): Promise<User | null> {
      const user = await User.findOne({ where: { id } })

      if (!user) return null

      return user
    }

    @Query(() => [User])
    async getUsersByRole (@Arg('role', () => Role, { defaultValue: Role.GUEST }) role: Role): Promise<User[]> {
      const users = await User.find({
        where: { role }
      })

      return users
    }
}
