import { ASTNode, GraphQLError, GraphQLScalarType, Kind, print } from 'graphql'

import { parseValue, serialize } from './util'

export const GraphQLObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'A valid MongoDB ObjectId',
  parseValue,
  serialize,
  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      return parseValue(ast.value)
    }
    throw new GraphQLError(`Provided value "${print(ast)}" is not a valid ObjectId`, { nodes: ast })
  },
})

export default GraphQLObjectId
