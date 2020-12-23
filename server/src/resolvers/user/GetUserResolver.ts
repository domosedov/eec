import { User } from '../../entity/User'
import { Arg, ID, Query, Resolver } from 'type-graphql'

@Resolver()
export class GetUserResolver {
  @Query(() => User)
  async getUserById (@Arg('id', () => ID) id: number): Promise<User | undefined> {
    return await User.findOne({ where: { id } })
  }
}
