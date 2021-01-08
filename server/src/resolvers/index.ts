import { CreateJopaResolver } from './user/CreateUser'
import UserResolvers from './user'
import ProfileResolvers from './profile'
import VacancyResolver from './vacancy'
import { TodoResolver } from './todo/Todo'

const resolvers = [...UserResolvers, ...ProfileResolvers, ...VacancyResolver, CreateJopaResolver, TodoResolver] as const

export default resolvers
