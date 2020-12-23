import { Arg, ID, Query, Resolver } from 'type-graphql'
import { User } from '../../../entity/User'

@Resolver()
export class GetUserResolver {
    @Query(() => [User])
  async getAllUsers (): Promise<User[]> {
    return User.find()
  }

    @Query(() => User, { nullable: true })
    async getUserById (@Arg('id', () => ID) id: number): Promise<User | null> {
      const user = await User.findOne({ where: { id } })

      if (!user) return null

      return user
    }
}
