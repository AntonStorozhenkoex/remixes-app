import { gql } from '@apollo/client';

export const GET_REMIXES_QUERY = gql`
  query getRemixesQuery($payload: RemixGetDTO!) {
    remixes(payload: $payload) {
      items {
        authorEmail
        name
        genre
        description
        id
        isStore
        price
        trackLength
      }
    }
  }
`;
