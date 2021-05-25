import gql from "graphql-tag";

export const ME_QUERY = gql`
query MeQuery {
    me {
        id
        email
        active
        role
        person {
          id
          firstName
          lastName
        }
    }
  }
`