import { Mark } from '../../entity/Mark'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class MarkResolver {
  @Query(() => [Mark])
  async marks () {
    return await Mark.find()
  }
}
