import { ApolloProvider, useReactiveVar } from "@apollo/client";

import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { AppRoute } from "./AppRoute";



const App = () => {

  // isLoggedInVar is declared using makeVar in the apollo.tsx file, but
// If you want to use this in all react components, you can set hook like this
// Now you can use isLoggedInVar(true) anywhere in the sub-component in this format
const isLoggedIn = useReactiveVar(isLoggedInVar);
const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <AppRoute />
    </ApolloProvider>
  );
};

export default App;
