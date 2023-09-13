import { gql } from "graphql-tag";

export const postTypes = gql`
  type Post {
    id: String
    title: String
    thumbnail: String
    content: String
    authorId: String
  }

  type Query {
    post: Post
    posts: [Post]
  }

  input PostInput {
    title: String
    thumbnail: String
    content: String
    authorId: String
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(input: PostInput): Post
    deletePost(id: String): Post
  }
`;
