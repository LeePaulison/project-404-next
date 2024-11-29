import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
