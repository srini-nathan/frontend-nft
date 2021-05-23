import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InputWithValidation } from "../form/InputWithValidation";

interface SignupFormProps {
  formik: any;
}

export const SignUpForm: FC<SignupFormProps> = ({
  formik,
}: SignupFormProps) => {
  return (
    <Row className="mt-5">
      <Col
        lg={{ span: 6, offset: 3 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12 }}
      >
        <Card>
          <Card.Body>
            <Card.Title as="h3">Sign up</Card.Title>
            <InputWithValidation
              label="First Name"
              id="firstName"
              type="text"
              placeholder="Enter first name"
              formik={formik}
            />
            <InputWithValidation
              label="Last Name"
              id="lastName"
              type="text"
              placeholder="Enter last name"
              formik={formik}
            />
            <InputWithValidation
              label="Password"
              id="password"
              type="password"
              placeholder="Enter password"
              formik={formik}
            />
            <InputWithValidation
              label="Confirm password"
              id="passwordConfirmation"
              type="password"
              placeholder="Enter password again"
              formik={formik}
            />
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Card.Body>
        </Card>
        <Card className="mt-2 text-center">
          <Card.Body>
            Already have an account? <Link to={"#"}>Login</Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
