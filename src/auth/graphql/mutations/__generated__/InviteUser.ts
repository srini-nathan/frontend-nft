/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: InviteUser
// ====================================================

export interface InviteUser_inviteUser {
  __typename: "ApiCall";
  feedback: ApiFeedback | null;
}

export interface InviteUser {
  inviteUser: InviteUser_inviteUser | null;
}

export interface InviteUserVariables {
  email: string;
  role: string;
}
