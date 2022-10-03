import { gql } from '@apollo/client';

export const DELETE_REMIX_BY_ID = gql`
  mutation DeleteByID($id: Int!) {
    deleteRemix(payload: { id: $id })
  }
`;
