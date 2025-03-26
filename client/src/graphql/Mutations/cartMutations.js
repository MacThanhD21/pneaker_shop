import { gql } from '@apollo/client';

const ADD_TO_CART = gql`
  mutation (
    $userId: ID!
    $productId: ID!
    $size: [Float]!
    $productPrice: Int!
  ) {
    addToCart(
      userId: $userId
      productId: $productId
      size: $size
      productPrice: $productPrice
    ) {
      userId
      cartProducts {
        productId
        productPrice
        size
        id
        selected
      }
    }
  }
`;

const DELETE_FROM_CART = gql`
  mutation ($id: ID!) {
    deleteProductFromCart(id: $id) {
      userId
      cartProducts {
        id
        productId
        productPrice
        size
        selected
      }
    }
  }
`;

const UPDATE_CART_ITEMS_SELECTION = gql`
  mutation ($cartProductIds: [ID!]!, $selected: Boolean!) {
    updateCartItemsSelection(cartProductIds: $cartProductIds, selected: $selected) {
      userId
      cartProducts {
        id
        productId
        productPrice
        size
        selected
      }
    }
  }
`;

export { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART_ITEMS_SELECTION };
