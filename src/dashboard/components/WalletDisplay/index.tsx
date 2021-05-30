import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectorList } from "../../../providers/Web3ConnectProviders/connectors";
import Modal from "../../../common/Modal";
import styles from "./WalletDisplay.module.scss";

const WalletDisplay = () => {
  const [showWeb3ConnectModal, setShowWeb3ConnectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { activate } = useWeb3React();

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => setShowWeb3ConnectModal(true)}
      >
        Fan Sign In
      </button>

      <Modal
        onClose={() => setShowWeb3ConnectModal(false)}
        isOpen={showWeb3ConnectModal}
        header={"Connect Wallet"}
      >
        <div className={styles.note}>
          <span>
            For Metamask: Please make sure you are connected to Kovan Testnet
          </span>
        </div>
        <div className={styles.container}>
          {connectorList().map((connector, index) => (
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await activate(connector.connector);
                  setLoading(false);
                  setShowWeb3ConnectModal(false);
                } catch (e) {
                  console.error(e);
                }
              }}
              key={index}
            >
              {loading ? "..." : connector.name}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default WalletDisplay;
