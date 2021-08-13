import { GraphQLScalarType, Kind } from 'graphql'

import { parseValue, serialize } from './util'

export const GraphQLObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'A valid MongoDB ObjectId',
  parseValue,
  serialize,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return parseValue(ast.value)
    }
    throw new Error()
  },
})

export default GraphQLObjectId
