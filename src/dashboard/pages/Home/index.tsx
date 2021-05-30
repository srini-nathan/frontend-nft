import { useWeb3React } from "@web3-react/core";
import { WalletSelector } from "../../../walletSelector/WalletSelector";
import Navigation from "../../components/Home/Navigation";
import { Title } from "../../components/Home/Title";
import { MyProfile } from "../../components/MyProfile";
import { Landing } from "../Landing";
import { MainContainer } from "./styled";

export const Home = () => {
  const { account } = useWeb3React();
  return (
    <>
      {account ? (
        <>In HomePage: {account}</>
      ) : (
        <>
          <Landing />
        </>
      )}
    </>
  );
};

export default Home;
