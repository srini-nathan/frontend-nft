import { Web3Provider, Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Web3ReactManagerFunctions } from "@web3-react/core/dist/types";
import { InjectedConnector } from "@web3-react/injected-connector";
import react, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletButton } from "./WalletButton";
import { injected, walletconnect, walletlink } from "../connectors";
import shortenHex from "../common/shortexHex";

const walletConnectorMap: Record<string, AbstractConnector> = {
  Metamask: injected,
  WalletConnect: walletconnect,
  WalletLink: walletlink,
};

type ErrorCode = string;
type Web3Error = Error & { code: ErrorCode };
type ErrorMessage = {
  heading: string;
  body: string;
};

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

export const WalletSelector = () => {
  const {
    library,
    account,
    connector,
    activate,
    active,
    deactivate,
    // error returned from web3 provider
    error,
    setError,
  } = useWeb3React<Web3Provider>();
  console.log(active, account);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector>();
  const [isPending, setIsPending] = useState(false);

  // manually detected error not provided by web3 provider;
  // we need to set this on state ourselves
  const [detectedError, setDetectedError] = useState<Web3Error>();

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

  const setToPendingState = useCallback((connector: AbstractConnector) => {
    setIsPending(true);
    setPendingWallet(connector);
  }, []);

  const retryConnectWallet = useCallback(() => {
    setIsPending(false);
    setDetectedError(undefined);
    deactivate();
  }, [deactivate]);

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

  if (displayedError) {
    return (
      <div>
        {displayedError.heading}
        {displayedError.body}
        <Button onClick={retryConnectWallet}>Retry</Button>
      </div>
    );
  }

  if (active) {
    return (
      <>
        {shortenHex(account ?? "")}
        <h6 onClick={retryConnectWallet} style={{ cursor: "pointer" }}>
          Disconnect this account
        </h6>
      </>
    );
  }
console.log(account);

  return (
    <div>
      {isPending ? (
        <WalletButton
          activate={activate}
          connector={pendingWallet}
          setToPendingState={setToPendingState}
          isPending={isPending}
        />
      ) : (
        Object.keys(walletConnectorMap).map((walletName) => {
          return (
            <WalletButton
              key={walletName}
              walletName={walletName}
              activate={activate}
              connector={walletConnectorMap[walletName]}
              setToPendingState={setToPendingState}
              isPending={isPending}
            />
          );
        })
      )}
    </div>
  );
};
