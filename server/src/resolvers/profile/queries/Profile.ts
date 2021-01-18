import { Profile } from '../../../entity/Profile'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async profiles () {
    return await Profile.find()
  }
}
