import { test } from 'tap'
import { ObjectId } from 'mongodb'

import { isValidObjectId, isValidStringObjectId, parseValue, serialize } from '../src/util'

test('isValidStringObjectId: should not accept undefined', t => {
  t.plan(1)
  const id = undefined as unknown as string
  t.notOk(isValidStringObjectId(id))
})
test('isValidStringObjectId: should not accept null', t => {
  t.plan(1)
  const id = null as unknown as string
  t.notOk(isValidStringObjectId(id))
})
test('isValidStringObjectId: should not accept non-string value', t => {
  t.plan(1)
  const id = 123 as unknown as string
  t.notOk(isValidStringObjectId(id))
})
test('isValidStringObjectId: should not accept invalid string', t => {
  t.plan(1)
  const id = '012345678912' as unknown as string
  t.notOk(isValidStringObjectId(id))
})
test('isValidStringObjectId: should accept valid ObjectId string', t => {
  t.plan(1)
  const id = new ObjectId().toString()
  t.ok(isValidStringObjectId(id))
})

test('isValidObjectId: should not accept undefined', t => {
  t.plan(1)
  const id = undefined as unknown as ObjectId
  t.notOk(isValidObjectId(id))
})
test('isValidObjectId: should not accept null', t => {
  t.plan(1)
  const id = null as unknown as ObjectId
  t.notOk(isValidObjectId(id))
})
test('isValidObjectId: should not accept non-string value', t => {
  t.plan(1)
  const id = 123 as unknown as ObjectId
  t.notOk(isValidObjectId(id))
})
test('isValidObjectId: should not accept invalid string', t => {
  t.plan(1)
  const id = '012345678912' as unknown as ObjectId
  t.notOk(isValidObjectId(id))
})
test('isValidObjectId: should accept valid ObjectId string', t => {
  t.plan(1)
  const id = new ObjectId()
  t.ok(isValidObjectId(id))
})

test('parseValue: should throw and error with invalid ObjectId', t => {
  t.plan(1)

  try {
    parseValue('invalid')
  } catch (err) {
    t.same((err as Error).message, `Provided value "invalid" is not a valid ObjectId`)
  }
})
test('parseValue: should return an ObjectId', t => {
  t.plan(1)

  const id = new ObjectId().toString()

  t.same(parseValue(id).toString(), id)
})

test('serialize: should throw and error with invalid ObjectId', t => {
  t.plan(1)

  try {
    serialize('invalid' as unknown as ObjectId)
  } catch (err) {
    t.same((err as Error).message, `Provided value "invalid" is not a valid ObjectId`)
  }
})
test('serialize: should return an ObjectId', t => {
  t.plan(1)

  const id = new ObjectId()

  t.same(serialize(id), id.toString())
})
