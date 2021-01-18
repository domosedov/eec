import { Subject } from '../../entity/Subject'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class SubjectResolver {
  @Query(() => [Subject])
  async subjects () {
    return await Subject.find()
  }
}
