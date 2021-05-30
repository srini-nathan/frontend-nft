import { useMutation } from "@apollo/client";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { MyProfile } from "..";
import _ from "lodash";
import ErrorMessage from "../../../../common/ErrorMessage";
import { InviteUserForm } from "./InviteUserForm";
import { INVITE_USER } from "../../../../auth/graphql/mutations/INVITE_USER";
import {
  InviteUser,
  InviteUserVariables,
} from "../../../../auth/graphql/mutations/__generated__/InviteUser";
import { InviteUserSchema } from "../../../../schemaValidation/InviteUserSchema";

const initialInviteUserValues = {
  email: "",
};

export type InviteUserFormSubmitT = {
  email: string;
};

export const InviteUserContainer = () => {
  const [inviteUserErrors, setInviteUserErrors] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: initialInviteUserValues,
    validationSchema: InviteUserSchema,
    onSubmit: async (
      values: InviteUserFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await inviteExternalUser(values);
      formikHelpers.resetForm();
    },
  });

  const [inviteUser] =
    useMutation<InviteUser, InviteUserVariables>(INVITE_USER);

  const { data, loading } = MyProfile();
  if (loading) {
    return <h4>Loading...</h4>;
  }
  const role = data?.me?.role === "Creator" ? "Creator" : "Admin";
  const inviteExternalUser = async (values: InviteUserFormSubmitT) => {
    console.log(values);
    try {
      await inviteUser({
        variables: {
          email: values.email,
          role,
        },
      });
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setInviteUserErrors([...errorMessages]);
    }
  };

  return (
    <>
      <ErrorMessage errors={inviteUserErrors} />
      <FormikProvider value={formik}>
        <Form>
          <InviteUserForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};
