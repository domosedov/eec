import { Profile } from '../../../entity/Profile'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class GetProfileResolver {
  @Query(() => Profile, { nullable: true })
  async getProfile () {
    return await Profile.findOne()
  }
}
