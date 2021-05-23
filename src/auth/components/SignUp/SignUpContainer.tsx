import { SignUpForm } from "./SignUpForm";
import { FC, useState } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { SIGNUP } from "../../graphql/mutations/SIGNUP";
import { useMutation } from "@apollo/client";
import _ from "lodash";
import {
  SignUpVariables,
  SignUp,
} from "../../graphql/mutations/__generated__/SignUp";
import ErrorMessage from "../../../common/ErrorMessage";
import { logUserIn } from "../../../apollo";

const initialSignUpValues = {
  signupToken: "",
  password: "",
  firstName: "",
  lastName: "",
  passwordConfirmation: "",
};

export type SignupFormSubmitT = {
  signupToken: string;
  password: string;
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
};

const SignUpContainer: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [signupErrors, setSignupErrors] = useState<string[]>([]);

  const [signUp, { error }] = useMutation<SignUp, SignUpVariables>(
    SIGNUP,
    {
      onCompleted: (data) => {
        data.signup?.token && logUserIn(data.signup?.token)
        history.push("/");
      },
    }
  );

  const handleSignup = async ({
    firstName,
    lastName,
    password,
    signupToken,
  }: SignupFormSubmitT) => {
    try {
      await signUp({
        variables: { firstName, lastName, password, signupToken },
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
      setSignupErrors([...errorMessages]);
    }
  };

  const formik = useFormik({
    initialValues: { ...initialSignUpValues, signupToken: id },
    onSubmit: async (
      values: SignupFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleSignup(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <>
      <ErrorMessage errors={signupErrors} />
      <FormikProvider value={formik}>
        <Form>
          <SignUpForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

export default SignUpContainer;
