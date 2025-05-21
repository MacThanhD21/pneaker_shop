const { gql } = require('apollo-server-express');

const newsletterTypeDefs = gql`
  type Newsletter {
    id: ID!
    email: String!
    isActive: Boolean!
    createdAt: String!
    lastNotified: String
  }

  extend type Mutation {
    subscribeNewsletter(email: String!): Newsletter!
    unsubscribeNewsletter(email: String!): Newsletter!
  }
`;

module.exports = newsletterTypeDefs; 