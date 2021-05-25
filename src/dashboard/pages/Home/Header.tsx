import { MeQuery, MeQuery_me } from "../../../auth/graphql/queries/__generated__/MeQuery";
import Navigation from "../../components/Home/Navigation";
import { Title } from "../../components/Home/Title";
import { MainContainer } from "./styled";

export const Header = ({ user }: { user:MeQuery_me }) => {

    const firstName = user?.person?.firstName ?? "firstName";
    const lastName = user?.person?.lastName ?? "lastName";
    const fullName = firstName + " " + lastName;

  return (
    <>
      <Navigation user={fullName} />
      <MainContainer>
        <Title user={fullName} />
      </MainContainer>
    </>
  );
};
