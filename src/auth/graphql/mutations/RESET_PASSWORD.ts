import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $currentPassword: String!, $newPassword: String!) {
    resetPassword(email: $email, currentPassword: $currentPassword, newPassword: $newPassword) {
      feedback
    }
  }
`;
