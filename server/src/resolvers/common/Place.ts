import { Place } from '../../entity/Place'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class PlaceResolver {
  @Query(() => [Place])
  async places () {
    return await Place.find()
  }
}
