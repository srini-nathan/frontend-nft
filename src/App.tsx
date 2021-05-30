import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { AppRoute } from "./AppRoute";
import Web3ConnectProvider from "./providers/Web3ConnectProviders";

const App = () => {
  // isLoggedInVar is declared using makeVar in the apollo.tsx file, but
  // If you want to use this in all react components, you can set hook like this
  // Now you can use isLoggedInVar(true) anywhere in the sub-component in this format
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  const getLibrary = (provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ConnectProvider>
          <AppRoute />
        </Web3ConnectProvider>
      </Web3ReactProvider>
    </ApolloProvider>
  );
};

export default App;
