import { ObjectId } from 'mongodb'

export function isValidStringObjectId(value: string): boolean {
  return (
    typeof value === 'string' && ObjectId.isValid(value) && new ObjectId(value).toString() === value
  )
}

export function isValidObjectId(value: ObjectId): boolean {
  return (
    value instanceof ObjectId &&
    ObjectId.isValid(value) &&
    new ObjectId(value).toString() === value.toString()
  )
}

export function parseValue(value: string): ObjectId {
  if (!isValidStringObjectId(value)) {
    throw new Error()
  }
  return new ObjectId(value)
}

export function serialize(value: ObjectId): string {
  if (!isValidObjectId(value)) {
    throw new Error()
  }
  return value.toString()
}
