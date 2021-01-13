import { buildSchema } from 'type-graphql'
import resolvers from '../resolvers'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const pubSub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL)
})

export const createSchema = () => buildSchema({
  resolvers,
  authChecker: ({ context: { req } }) => {
    return !!req.session!.userId
  },
  // validate: false,
  dateScalarMode: 'isoDate',
  emitSchemaFile: true,
  pubSub
})
