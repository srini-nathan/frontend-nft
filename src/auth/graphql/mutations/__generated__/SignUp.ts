/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApiFeedback } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signup {
  __typename: "AuthPayload";
  feedback: ApiFeedback | null;
  token: string | null;
}

export interface SignUp {
  signup: SignUp_signup | null;
}

export interface SignUpVariables {
  signupToken: string;
  password: string;
  firstName: string;
  lastName: string;
}
