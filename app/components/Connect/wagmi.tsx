"use client";

import {
  WagmiConfig,
  createConfig,
  configureChains,
  Chain,
  mainnet,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const neo = {
  id: 2970385,
  name: "Neo",
  network: "neo",
  nativeCurrency: {
    decimals: 18,
    name: "GAS",
    symbol: "GAS",
  },
  rpcUrls: {
    public: { http: ["https://neo-jsonrpc-wrapper.vercel.app/api/rpc"] },
    default: { http: ["https://neo-jsonrpc-wrapper.vercel.app/api/rpc"] },
  },
  blockExplorers: {
    etherscan: { name: "NeoExplorer", url: "https://evm.ngd.network/" },
    default: { name: "NeoExplorer", url: "https://evm.ngd.network/" },
  },
} as const satisfies Chain;

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const {
  chains: [, ...chains],
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [mainnet, neo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
        webSocket: chain.rpcUrls.default.webSocket?.[0],
      }),
    }),
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      options: {
        name: "Metamask",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "ed0689abdfe0f37180648dd8a03ef52b",
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: process.env.NEXT_PUBLIC_BRAND_NAME || "",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
