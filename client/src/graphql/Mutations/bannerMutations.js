import { gql } from '@apollo/client';

export const CREATE_BANNER = gql`
  mutation CreateBanner($input: BannerInput!) {
    createBanner(input: $input) {
      id
      image
      title
      description
      link
      isActive
      order
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BANNER = gql`
  mutation UpdateBanner($id: ID!, $input: UpdateBannerInput!) {
    updateBanner(id: $id, input: $input) {
      id
      image
      title
      description
      link
      isActive
      order
      updatedAt
    }
  }
`;

export const DELETE_BANNER = gql`
  mutation DeleteBanner($id: ID!) {
    deleteBanner(id: $id) {
      id
    }
  }
`; 