import { gql } from '@apollo/client';

const CREATE_REVIEW = gql`
  mutation ($productId: ID!, $userRate: Int!, $comment: String!) {
    createProductReview(productId: $productId, userRate: $userRate, comment: $comment) {
      id
      rates
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation ($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }`;
const CREATE_PRODUCT = gql`
  mutation (
    $title: String!
    $brand: String!
    $model: String!
    $image: String!
    $price: String
    $color: String
    $size: [ProductSizeInput!]!
  ) {
    addProduct(
      addProductInput: {
        title: $title
        brand: $brand
        model: $model
        image: $image
        price: $price
        color: $color
        size: $size
      }
    ) {
      id
      title
      brand
      color
      image
      inStock
      model
      numReviews
      price
      rates
      reviews {
        rating
        userId
      }
      size {
        size
        quantity
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation (
    $productId: ID
    $title: String
    $brand: String
    $model: String
    $image: String
    $price: String
    $color: String
    $size: String
  ) {
    updateProduct(
      updateProductInput: {
        productId: $productId
        title: $title
        brand: $brand
        model: $model
        image: $image
        price: $price
        color: $color
        size: $size
      }
    ) {
      id
      title
      brand
      color
      image
      inStock
      model
      numReviews
      price
      rates
      reviews {
        rating
        userId
      }
      size
    }
  }
`;
export { CREATE_REVIEW, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT };
