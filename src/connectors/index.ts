import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import Web3 from 'web3'
import { Provider, Web3Provider } from "@ethersproject/providers";

console.log(process.env.NODE_ENV);

const defaultChainId = process.env.NODE_ENV === "production" ? 1 : 3;

const NETWORK_URL =
    'https://mainnet.infura.io/v3/d623a29013ad40b2869df8b01dfd6e18';

const ROPSTEN_URL = "https://ropsten.infura.io/v3/d623a29013ad40b2869df8b01dfd6e18"

const RPC_URLS: { [chainId: number]: string } = {
    1: process.env.RPC_URL_1 ?? NETWORK_URL as string,
    4: process.env.RPC_URL_4 ?? ROPSTEN_URL as string,
};

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3],
});

export const authereum = new AuthereumConnector({ chainId: defaultChainId });

export const network = new NetworkConnector({
    urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
    defaultChainId: defaultChainId,
});



export const walletconnect = new WalletConnectConnector({
    rpc: { 1: NETWORK_URL },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 150000,
});

export const walletlink = new WalletLinkConnector({
    url: NETWORK_URL,
    appName: 'gallery',
});