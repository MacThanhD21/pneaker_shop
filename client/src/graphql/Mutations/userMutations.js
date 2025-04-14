import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      firstName
      lastName
      shoeSize
      isAdmin
      createdAt
      shippingAddress {
        city
        postalCode
        country
        address
        phoneNumber
      }
      topPicks
    }
  }
`;

const REGISTER_USER = gql`
  mutation (
    $username: String!
    $password: String!
    $email: String!
    $confirmedPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        email: $email
        confirmedPassword: $confirmedPassword
      }
    ) {
      id
      email
      username
      password
      token
      shippingAddress {
        city
        postalCode
        country
        address
        phoneNumber
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation (
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $shoeSize: Float
    $password: String
    $currentPassword: String
  ) {
    updateUser(
      updateUserInput: {
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
        shoeSize: $shoeSize
        password: $password
        currentPassword: $currentPassword
      }
    ) {
      id
      username
      email
      firstName
      lastName
      shoeSize
      createdAt
      isAdmin
      token
      password
      currentPassword
      shippingAddress {
        city
        postalCode
        country
        address
        phoneNumber
      }
    }
  }
`;

const UPDATE_SHIPPING = gql`
  mutation (
    $city: String
    $address: String
    $country: String
    $phoneNumber: String
    $postalCode: String
  ) {
    updateShipping(
      updateShippingInput: {
        city: $city
        address: $address
        country: $country
        phoneNumber: $phoneNumber
        postalCode: $postalCode
      }
    ) {
      shippingAddress {
        address
        city
        country
        postalCode
      }
      id
      username
      email
      firstName
      lastName
      shoeSize
      createdAt
      isAdmin
      token
      password
      currentPassword
    }
  }
`;
export const UPDATE_ROLE = gql`
    mutation UpdateRole($userId: ID!, $isAdmin: Boolean!) {
        updateRoleUser(userId: $userId, isAdmin: $isAdmin) {
            id
            username
            email
            isAdmin
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(userId: $userId) {
            id
        }
    }
`;
export { REGISTER_USER, LOGIN_USER, UPDATE_USER, UPDATE_SHIPPING};
