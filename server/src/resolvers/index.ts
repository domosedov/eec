import { CreateJopaResolver } from './user/CreateUser'
import UserResolvers from './user'
import ProfileResolvers from './profile'

const resolvers = [...UserResolvers, ...ProfileResolvers, CreateJopaResolver] as const

export default resolvers
