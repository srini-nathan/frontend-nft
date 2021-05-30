import { Col, Row } from "react-bootstrap";
import { MyProfile } from ".";
import { EmailTemplate } from "./EmailTemplate";
import { InviteUserContainer } from "./InviteUser/InviteUserContainer";
import { PasswordResetContainer } from "./ResetPassword/PasswordResetContainer";
import { MainContainer } from "./ResetPassword/styled";

export const Profile = ({ ...props }) => {
  const { data, loading } = MyProfile();
  if (loading) {
    return <h4>Loading...</h4>;
  }
  const email = data?.me?.email ?? "";

  return (
    <MainContainer>
      <Row>
        <Col>
          <PasswordResetContainer />
        </Col>
        <Col>
          <EmailTemplate email={email} />
          <InviteUserContainer />
        </Col>
      </Row>
    </MainContainer>
  );
};
