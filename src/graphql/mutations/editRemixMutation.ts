import { gql } from '@apollo/client';

export const EDIT_REMIX_MUTATION = gql`
  mutation updateRemix(
    $authorEmail: String!
    $isStore: Boolean!
    $name: String!
    $description: String!
    $price: Int!
    $trackLength: Int!
    $genre: GenreTypeEnum!
    $id: Int!
  ) {
    updateRemix(
      payload: {
        authorEmail: $authorEmail
        isStore: $isStore
        name: $name
        description: $description
        price: $price
        trackLength: $trackLength
        genre: $genre
        id: $id
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
