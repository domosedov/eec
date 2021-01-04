import { CreateJopaResolver } from './user/CreateUser'
import UserResolvers from './user'
import ProfileResolvers from './profile'
import { TodoResolver } from './todo/Todo'

const resolvers = [...UserResolvers, ...ProfileResolvers, CreateJopaResolver, TodoResolver] as const

export default resolvers
