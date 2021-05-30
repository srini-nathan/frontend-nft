import gql from "graphql-tag";

export const INVITE_USER = gql`
  mutation InviteUser($email: String!, $role: String!) {
    inviteUser(email: $email, role: $role) {
      feedback
    }
  }
`;
