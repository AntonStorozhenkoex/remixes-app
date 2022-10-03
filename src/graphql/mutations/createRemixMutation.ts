import { gql } from '@apollo/client';

export const CREATE_REMIX_MUTATION = gql`
  mutation createNewRemix(
    $authorEmail: String!
    $isStore: Boolean!
    $name: String!
    $description: String!
    $price: Int!
    $trackLength: Int!
    $genre: GenreTypeEnum!
  ) {
    createRemix(
      payload: {
        authorEmail: $authorEmail
        isStore: $isStore
        name: $name
        description: $description
        price: $price
        trackLength: $trackLength
        genre: $genre
      }
    ) {
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
`;
