import { FieldResolver, ID, Query, Resolver, Root } from 'type-graphql'
import { Vacancy } from '../../../entity/Vacancy'

@Resolver(() => Vacancy)
export class VacancyResolver {
  @FieldResolver(() => ID, { nullable: true })
  async selectedProfileId (@Root() vacancy: Vacancy) {
    const result = await Vacancy.findOne({
      where: {
        id: vacancy.id
      },
      relations: ['selectedProfile'],
      select: ['id']
    })

    if (!result) return null

    const profileId = result?.selectedProfile?.id

    if (!profileId) return null

    return profileId
  }

  @Query(() => [Vacancy])
  async vacancies () {
    return await Vacancy.find()
  }
}
