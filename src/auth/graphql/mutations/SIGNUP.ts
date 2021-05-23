import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation SignUp(
    $signupToken: ID!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      signupToken: $signupToken
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      feedback
      token
    }
  }
`;
