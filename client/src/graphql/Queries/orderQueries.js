import { gql } from '@apollo/client';

const GET_USER_ORDER = gql`
  query {
    getUserOrders {
      id
      purchasedBy
      datePurchased
      orderProducts {
        productId
        productPrice
        size
      }
    }
    
  }
`;

const GET_ALL_ORDERS = gql`
  query {
    getAllOrders {
      datePurchased
      id
      orderProducts {
        id
        productId
        productPrice
      }
      purchasedBy
    }
  }
`

export { GET_USER_ORDER, GET_ALL_ORDERS };
