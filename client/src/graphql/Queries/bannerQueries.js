import { gql } from '@apollo/client';

export const GET_ALL_BANNERS = gql`
  query GetAllBanners {
    getAllBanners {
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

export const GET_ACTIVE_BANNERS = gql`
  query GetActiveBanners {
    getActiveBanners {
      id
      image
      title
      description
      link
      order
    }
  }
`; 