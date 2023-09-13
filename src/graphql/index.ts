import { gql } from "apollo-server-express";
import { usersResolver } from "./resolvers/user.resolver";
import { postTypes } from "./typedefs/post";
import { userTypes } from "./typedefs/user";

export const typeDefs = gql`
  ${postTypes}
  ${userTypes}
`;

export const resolvers = {
  Query: {
    ...usersResolver.Query,
  },

  Mutation: {
    ...usersResolver.Mutation,
  },
};
