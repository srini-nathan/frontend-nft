/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_person {
  __typename: "Person";
  id: string;
  firstName: string;
  lastName: string;
}

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
  active: boolean;
  role: string;
  person: MeQuery_me_person | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}
