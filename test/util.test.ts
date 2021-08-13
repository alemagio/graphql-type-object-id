import { test } from 'tap'
import { ObjectId } from 'mongodb'

import { parseValue, serialize } from '../src/util'

test('parseValue: should throw and error with invalid ObjectId', t => {
  t.plan(1)

  t.throws(parseValue.bind(null, 'invalid'))
})

test('parseValue: should return an ObjectId', t => {
  t.plan(1)

  const id = new ObjectId().toString()

  t.same(parseValue(id).toString(), id)
})

test('serialize: should throw and error with invalid ObjectId', t => {
  t.plan(1)

  t.throws(serialize.bind(null, 'invalid'))
})

test('serialize: should return an ObjectId', t => {
  t.plan(1)

  const id = new ObjectId().toString()

  t.same(serialize(id), id.toString())
})
