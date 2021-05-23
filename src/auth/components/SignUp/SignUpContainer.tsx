import { SignUpForm } from "./SignUpForm";
import { FC } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { SIGNUP } from "../../graphql/mutations/SIGNUP";
import { useMutation } from "@apollo/client";

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
  const {id} = useParams<{ id: string }>();
  const history = useHistory();

  const [signUp, { loading }] = useMutation(SIGNUP)

  const handleSignup = async (values:SignupFormSubmitT) => {
    signUp({variables:{}})
  } 
  

  const formik = useFormik({
    initialValues: {...initialSignUpValues, signupToken:id},
    onSubmit: async (
      values: SignupFormSubmitT,
      formikHelpers: FormikHelpers<any>
    ) => {
      await handleSignup(values)
      formikHelpers.resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <SignUpForm formik={formik} />
      </Form>
    </FormikProvider>
  );
};

export default SignUpContainer;
