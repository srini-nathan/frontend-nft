import {
    ApolloClient ,
    createHttpLink,
    InMemoryCache,
    makeVar ,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  
  // token constance
  const  TOKEN  =  'Authorization' ;
  const DARK_MODE = 'DARK_MODE';
  
  // Create a reactive variable named isLoggedInVar
  // The initial value is true if the token stored in localStorage exists, and false if it does not exist.
  export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
  
  
  // If the user successfully logs in, a token is returned.
  // Store the token in localStorage and set isLoggedInvar to true in the reactive variable
  export const logUserIn = (token: string) => {
    localStorage.setItem(TOKEN, `Bearer ${token}`);
    isLoggedInVar(true);
  };
  
  // At this point when the user logs out successfully
  // Remove the token stored in localStorage and set isLoggedInvar to false in the reactive variable
  export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
  };
  
  // reactive variable for the state of darkMode
  // If darkmode setting exists in localstorage, initialize it to false if not true
  export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
  
  // Save the enabled value in the key value called DARK_MODE in localStorage
  export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, 'enabled');
    darkModeVar(true);
  };
  
  // After deleting the key value called DARK_MODE in localStorage, set the reactive variable darkModeVar to false
  export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  };
  
  // ------ end of darkmode settings
  
  // Set the address to connect to the backend
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
  });
  
  // The setContext function adds several items to all requests of the client.
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        // Spread the contents of the existing headers
        ...headers,
        // Overwrite the contents of new headers on it.
        // You need to match the form of headers to be delivered to the backend.
        // The client sends it as headers{token:"some token"}
        // In the backend, headers{tokkkkken: "some token"} is received and used.
        // To prevent such a case, the key value must be well specified.
        Authorization: localStorage.getItem(TOKEN),
      },
    };
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });