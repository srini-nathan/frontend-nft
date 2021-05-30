/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: "ApiCall";
  feedback: ApiFeedback | null;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword | null;
}

export interface ResetPasswordVariables {
  email: string;
  currentPassword: string;
  newPassword: string;
}
