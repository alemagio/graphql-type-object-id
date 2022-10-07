import { ObjectId } from 'mongodb'
import { GraphQLError } from 'graphql'

export function isValidStringObjectId(value: unknown): boolean {
  return (
    typeof value === 'string' && ObjectId.isValid(value) && new ObjectId(value).toString() === value
  )
}

export function isValidObjectId(value: any): boolean {
  return ObjectId.isValid(value) && new ObjectId(value).toString() === value.toString()
}

export function parseValue(value: unknown): ObjectId {
  if (!isValidStringObjectId(value)) {
    throw new GraphQLError(`Provided value "${value}" is not a valid ObjectId`)
  }
  return new ObjectId(value as string)
}

export function serialize(value: unknown): string {
  if (!isValidObjectId(value)) {
    throw new GraphQLError(`Provided value "${value}" is not a valid ObjectId`)
  }
  return (value as ObjectId).toString()
}
