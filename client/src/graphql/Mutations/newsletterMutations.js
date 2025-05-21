import { gql } from '@apollo/client';

const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($email: String!) {
    subscribeNewsletter(email: $email) {
      id
      email
      createdAt
    }
  }
`;

const UNSUBSCRIBE_NEWSLETTER = gql`
  mutation UnsubscribeNewsletter($email: String!) {
    unsubscribeNewsletter(email: $email) {
      id
      email
    }
  }
`;

export {
  SUBSCRIBE_NEWSLETTER,
  UNSUBSCRIBE_NEWSLETTER
}; 