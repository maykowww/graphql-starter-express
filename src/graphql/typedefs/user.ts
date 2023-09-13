import { gql } from "graphql-tag";

export const userTypes = gql`
  type User {
    id: String!
    email: String
    username: String
    posts: [Post]
  }

  input UserInput {
    email: String!
    username: String
  }

  input UpdateUserInput {
    userId: String!
    username: String
    email: String
  }

  type Query {
    user(id: String!): User
    users: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: String!): User
  }
`;
