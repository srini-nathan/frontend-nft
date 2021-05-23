import { FC } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { LoginForm } from "./LoginForm";
import { LOGIN } from "../../graphql/mutations/LOGIN";

const initialSignUpValues = {
  email: "",
  password: "",
};

export type SignupFormSubmitT = {
  email: string;
  password: string;
};

const LoginContainer: FC = () => {

  const [login, { loading }] = useMutation(LOGIN)

  const handleLogin = async (values:SignupFormSubmitT) => {
    login({variables:{}})
  } 
  

  const formik = useFormik({
    initialValues: initialSignUpValues,
    onSubmit: async (
      values: SignupFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleLogin(values)
      formikHelpers.resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <LoginForm formik={formik} />
      </Form>
    </FormikProvider>
  );
};

export default LoginContainer;
