import { gql } from "apollo-graphql";

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    location: String!
    phone: String!
    profileImageUrl: String!
  }
  type Post {
    id: ID!
    user: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    user: String!
    body: String!
  }
`;
