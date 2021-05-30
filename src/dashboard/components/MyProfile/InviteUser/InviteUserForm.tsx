import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { InputWithValidation } from "../../../../auth/components/form/InputWithValidation";

interface InviteUserFormProps {
  formik: any;
}

export const InviteUserForm: FC<InviteUserFormProps> = ({
  formik,
}: InviteUserFormProps) => {
  return (
    <Row className="mt-2">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title as="h4">Send Invitation</Card.Title>
            <InputWithValidation
              label="Email"
              id="email"
              type="email"
              placeholder="Enter Email"
              formik={formik}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
