import { City } from '../../entity/City'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class CityResolver {
  @Query(() => [City])
  async cities () {
    return await City.find()
  }
}
