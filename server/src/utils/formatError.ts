import { ApolloError } from 'apollo-server-express'
import { GraphQLFormattedError, GraphQLError } from 'graphql'
import { ArgumentValidationError } from 'type-graphql'

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (error.originalError instanceof ApolloError) {
    console.log(error.message)
    return error
  }

  if (error.originalError instanceof ArgumentValidationError) {
    if (error && error.extensions) {
      error.extensions.code = 'GRAPHQL_VALIDATION_FAILED'
    }
    return error
  }

  return error
}
