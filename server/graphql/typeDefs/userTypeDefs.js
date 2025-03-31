import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    firstName: String
    lastName: String
    shoeSize: Float
    isAdmin: Boolean!
    createdAt: String!
    shippingAddress: ShippingAddress
  }

  type ShippingAddress {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmedPassword: String!
  }

  type Query {
    getUserById: User!
    getAllUsers: [User]!
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
    updateUserProfile(
      firstName: String
      lastName: String
      shoeSize: Float
    ): User!
    updateShippingAddress(shippingAddress: ShippingAddressInput!): User!
  }
`; 