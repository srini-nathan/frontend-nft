import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../../../../auth/components/form/InputWithValidation";

interface PasswordResetFormProps {
  formik: any;
}

export const PasswordResetForm: FC<PasswordResetFormProps> = ({
  formik,
}: PasswordResetFormProps) => {
  return (
    <Row className="mt-2">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title as="h4">Reset Password</Card.Title>
            <InputWithValidation
              label="Current Password"
              id="currentPassword"
              type="password"
              placeholder="Enter Current Password"
              formik={formik}
            />
            <InputWithValidation
              label="New Password"
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              formik={formik}
            />
            <InputWithValidation
              label="Verify Password"
              id="verifyPassword"
              type="password"
              placeholder="Re-Enter new password"
              formik={formik}
            />
            <Button variant="primary" type="submit" block>
              Reset
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
