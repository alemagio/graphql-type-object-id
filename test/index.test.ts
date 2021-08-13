import { test } from 'tap'
import gql from 'graphql-tag'
import { graphql } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { GraphQLObjectId } from '../src'
import { ObjectId } from 'mongodb'

const typeDefs = gql`
  scalar ObjectId

  type Query {
    testObjectId(id: ObjectId!): ObjectId!
  }
`

const resolvers = {
  ObjectId: GraphQLObjectId,
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testObjectId(_: any, { id }: { id: string }) {
      return id
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
})

test(`should throw an error with invalid ObjectId`, async t => {
  t.plan(1)

  const id = 'invalid'

  const { errors } = await graphql({
    schema,
    source: `
      query testObjectId($id: ObjectId!) {
        testObjectId(id: $id)
      }
    `,
    variableValues: {
      id,
    },
  })

  t.same(
    errors?.[0].message,
    `Variable "$id" got invalid value "${id}"; Expected type "ObjectId". `,
  )
})

test(`should process a valid ObjectId`, async t => {
  t.plan(2)

  const id = new ObjectId()

  const { errors, data } = await graphql({
    schema,
    source: `
      query testObjectId($id: ObjectId!) {
        testObjectId(id: $id)
      }
    `,
    variableValues: {
      id,
    },
  })

  t.same(errors, undefined)
  t.same(data?.testObjectId, id.toString())
})

test(`should process a valid ObjectId string`, async t => {
  t.plan(2)

  const id = new ObjectId().toString()

  const { errors, data } = await graphql({
    schema,
    source: `
      query testObjectId($id: ObjectId!) {
        testObjectId(id: $id)
      }
    `,
    variableValues: {
      id,
    },
  })

  t.same(errors, undefined)
  t.same(data?.testObjectId, id)
})

test(`should throw an error with invalid ObjectId as literal`, async t => {
  t.plan(1)

  const id = 'invalid'

  const { errors } = await graphql({
    schema,
    source: `
      query {
        testObjectId(id: "${id}")
      }
    `,
  })

  t.same(errors?.[0].message, `Expected value of type "ObjectId!", found "invalid"; `)
})

test(`should throw an error with invalid String as literal`, async t => {
  t.plan(1)

  const { errors } = await graphql({
    schema,
    source: `
      query {
        testObjectId(id: 999)
      }
    `,
  })

  t.same(errors?.[0].message, `Expected value of type "ObjectId!", found 999; `)
})

test(`should process a valid ObjectId as literal`, async t => {
  t.plan(2)

  const id = new ObjectId()

  const { errors, data } = await graphql({
    schema,
    source: `
      query {
        testObjectId(id: "${id}")
      }
    `,
    variableValues: {
      id,
    },
  })

  t.same(errors, undefined)
  t.same(data?.testObjectId, id.toString())
})

test(`should process a valid ObjectId string as literal`, async t => {
  t.plan(2)

  const id = new ObjectId().toString()

  const { errors, data } = await graphql({
    schema,
    source: `
      query {
        testObjectId(id: "${id}")
      }
    `,
    variableValues: {
      id,
    },
  })

  t.same(errors, undefined)
  t.same(data?.testObjectId, id.toString())
})
