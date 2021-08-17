import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'

export function isValidStringObjectId(value: string): boolean {
  return (
    typeof value === 'string' && ObjectId.isValid(value) && new ObjectId(value).toString() === value
  )
}

export function isValidObjectId(value: ObjectId): boolean {
  return ObjectId.isValid(value) && new ObjectId(value).toString() === value.toString()
}

export function parseValue(value: string): ObjectId {
  if (!isValidStringObjectId(value)) {
    throw new GraphQLError(`Provided value "${value}" is not a valid ObjectId`)
  }
  return new ObjectId(value)
}

export function serialize(value: ObjectId): string {
  if (!isValidObjectId(value)) {
    throw new GraphQLError(`Provided value "${value}" is not a valid ObjectId`)
  }
  return value.toString()
}
