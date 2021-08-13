import { ObjectId } from 'mongodb'

export function parseValue(value: string): ObjectId {
  if (!ObjectId.isValid(value)) {
    throw new Error()
  }
  return new ObjectId(value)
}

export function serialize(value: string): string {
  if (!ObjectId.isValid(value)) {
    throw new Error()
  }
  return value.toString()
}
