import { FC, useState } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { LoginForm } from "./LoginForm";
import { LOGIN } from "../../graphql/mutations/LOGIN";
import _ from "lodash";
import {
  LoginVariables,
  Login,
} from "../../graphql/mutations/__generated__/Login";
import ErrorMessage from "../../../common/ErrorMessage";
import { useHistory } from "react-router";
import { logUserIn } from "../../../apollo";

const initialLoginValues = {
  email: "",
  password: "",
};

export type LoginFormSubmitT = {
  email: string;
  password: string;
};

const LoginContainer: FC = () => {
  const history = useHistory();
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [login] = useMutation<Login, LoginVariables>(LOGIN, {
    onCompleted: (data) => {
      data.login?.token && logUserIn(data.login?.token)
      
      history.push("/");
    },
  });

  const handleLogin = async ({ email, password }: LoginFormSubmitT) => {
    try {
      await login({ variables: { email, password } });
    } catch (error) {
      console.log(error);
      const graphQLErrors = _.get(error, "graphQLErrors", [error]);
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message];
        },
        []
      );
      setLoginErrors([...errorMessages]);
    }
  };

  const formik = useFormik({
    initialValues: initialLoginValues,
    onSubmit: async (
      values: LoginFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleLogin(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <>
      <ErrorMessage errors={loginErrors} />
      <FormikProvider value={formik}>
        <Form>
          <LoginForm formik={formik} />
        </Form>
      </FormikProvider>
    </>
  );
};

export default LoginContainer;
