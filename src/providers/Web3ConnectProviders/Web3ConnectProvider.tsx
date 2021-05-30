import React, { useState, useEffect, createContext, useMemo } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../../hooks/useWeb3';

interface Web3ConnectProviderContext {}

export const Context = createContext<Web3ConnectProviderContext>({});

type ErrorCode = string;
type Web3Error = Error & { code: ErrorCode };
type ErrorMessage = {
  heading: string;
  body: string;
};

// documentation: https://codesandbox.io/s/github/NoahZinsmeister/web3-react/tree/v6/example?fontsize=14&hidenavigation=1&theme=dark&file=/pages/index.tsx:2639-2771

const Web3ConnectProvider: React.FC = ({ children }) => {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
    setError
  } = useWeb3React<providers.Web3Provider>();

  const [activatingConnector, setActivatingConnector] = useState<any>();

  // manually detected error not provided by web3 provider;
  // we need to set this on state ourselves
  const [detectedError, setDetectedError] = useState<Web3Error>();

  // TODO: consider making these enums
const ERROR_MESSAGES: Record<ErrorCode, ErrorMessage> = {
  // client-side provider errors: https://eips.ethereum.org/EIPS/eip-1193#provider-errors
  "4001": {
    heading: "Authorization denied",
    body: "Please authorize the app to log in.",
  },
  REJECTED_SIGNATURE: {
    heading: "Signature required",
    body: "Please sign the message with your wallet to log in.",
  },
  UNKNOWN_ERROR: {
    heading: "There was an error connecting",
    body: "Please try again.",
  },
};

function getErrorMessage(errorCode: string) {
  return ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

const displayedError = useMemo(() => {
  // @ts-ignore
  console.log("the error from provider", error, error?.code);
  const errorToDisplay = (error as Web3Error | undefined) ?? detectedError;
  if (!errorToDisplay) return null;
  if (!errorToDisplay.code) {
    // manually handle error cases as we run into them with wallets
    if (errorToDisplay.name === "UserRejectedRequestError") {
      errorToDisplay.code = "4001";
    }
  }
  const parsedError = getErrorMessage(errorToDisplay.code ?? "");
  return parsedError;
}, [error, detectedError]);

 /**
   * Ensures screen does not retain an error message when it remounts. Since Web3
   * library errors are stored in the Web3Provider, they remain cached and continue
   * to stick around if the user navigates away and comes back (or closes a modal
   * and re-opens it).
   */
  useEffect(() => {
    // @ts-expect-error: this is the only way to clear the error from the provider
    // manually, but the library doesn't give us the option to pass in a non-error
    return () => setError(undefined);
  }, [setError]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // if (displayedError) {
  //   return (
  //     <div>
  //       {displayedError.heading}
  //       {displayedError.body}
  //       {/* <Button onClick={retryConnectWallet}>Retry</Button> */}
  //     </div>
  //   );
  // }

  

  

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default Web3ConnectProvider;