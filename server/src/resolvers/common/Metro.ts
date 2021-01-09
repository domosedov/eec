import { Metro } from '../../entity/Metro'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class MetroResolver {
  @Query(() => [Metro])
  async metros () {
    return await Metro.find()
  }
}
