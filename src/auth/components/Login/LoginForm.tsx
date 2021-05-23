import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../form/InputWithValidation";

interface LoginFormProps {
  formik: any;
}

export const LoginForm: FC<LoginFormProps> = ({
  formik,
}: LoginFormProps) => {
  return (
    <Row className="mt-5">
      <Col
        lg={{ span: 6, offset: 3 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12 }}
      >
        <Card>
          <Card.Body>
            <Card.Title as="h3">Login</Card.Title>
            <InputWithValidation
              label="Email"
              id="email"
              type="email"
              placeholder="Enter email address"
              formik={formik}
            />
            <InputWithValidation
              label="Password"
              id="password"
              type="password"
              placeholder="Enter password"
              formik={formik}
            />
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
