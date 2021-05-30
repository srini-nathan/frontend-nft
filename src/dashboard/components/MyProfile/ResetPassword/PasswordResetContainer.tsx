import { useMutation } from "@apollo/client";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { MyProfile } from "..";
import { RESET_PASSWORD } from "../../../../auth/graphql/mutations/RESET_PASSWORD";
import {
  ResetPassword,
  ResetPasswordVariables,
} from "../../../../auth/graphql/mutations/__generated__/ResetPassword";
import { ChangePasswordSchema } from "../../../../schemaValidation/ChangePasswordSchema";
import { PasswordResetForm } from "./PasswordResetForm";
import _ from "lodash";
import ErrorMessage from "../../../../common/ErrorMessage";

const initialPasswordResetValues = {
  currentPassword: "",
  newPassword: "",
  verifyPassword: "",
};

export type PasswordResetFormSubmitT = {
  currentPassword: string;
  newPassword: string;
  verifyPassword: string;
};

export const PasswordResetContainer = () => {
  const [resetPasswordErrors, setResetPasswordErrors] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: initialPasswordResetValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: async (
      values: PasswordResetFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await passowrdReset(values);
      formikHelpers.resetForm();
    },
  });

  const [resetPassword] =
    useMutation<ResetPassword, ResetPasswordVariables>(RESET_PASSWORD);

  const { data, loading } = MyProfile();
  if (loading) {
    return <h4>Loading...</h4>;
  }
  const email = data?.me?.email!;
  const passowrdReset = async (values: PasswordResetFormSubmitT) => {
    console.log(values);
    try {
      await resetPassword({
        variables: {
          email,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
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
      setResetPasswordErrors([...errorMessages]);
    }
  };

  return (
    <>
      <ErrorMessage errors={resetPasswordErrors} />
      <FormikProvider value={formik}>
        <Form>
          <PasswordResetForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};
