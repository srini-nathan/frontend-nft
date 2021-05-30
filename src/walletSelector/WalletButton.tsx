import { Web3ReactManagerFunctions } from "@web3-react/core/dist/types";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useCallback, useMemo } from "react";
import { injected } from "../connectors";
import { Button } from "react-bootstrap";

type WalletButtonProps = {
  walletName?: string;
  activate: Web3ReactManagerFunctions["activate"];
  connector?: AbstractConnector;
  setToPendingState: (connector: AbstractConnector) => void;
  isPending: boolean;
};

export const WalletButton = ({
  walletName,
  activate,
  connector,
  setToPendingState,
  isPending
}: WalletButtonProps) => {
  const handleClick = useCallback(() => {
    if (walletName && walletName.toLowerCase() === "metamask") {
      injected.isAuthorized().then((isAuthorized: boolean) => {
          
        // TODO: figure out what goes here
      });
    }

    if (connector) {
      setToPendingState(connector);
      activate(connector);
    }
  }, [activate, connector, setToPendingState, walletName]);
  

  const loadingView = useMemo(() => {
    return <>{"Connecting..."}</>;
  }, []);

  const iconView = useMemo(() => {
    if (!walletName) return null;

    return <>{walletName}</>;
  }, [walletName]);
  

  return (
    <Button
      data-testid="wallet-button"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? loadingView : iconView}
    </Button>
  );
};
