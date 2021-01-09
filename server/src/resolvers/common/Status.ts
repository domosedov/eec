import { Status } from '../../entity/Status'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class StatusResolver {
  @Query(() => [Status])
  async statuses () {
    return await Status.find()
  }
}
