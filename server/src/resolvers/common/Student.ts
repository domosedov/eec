import { Student } from '../../entity/Student'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class StudentResolver {
  @Query(() => [Student])
  async students () {
    return await Student.find()
  }
}
