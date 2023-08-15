import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

export const projectId = "bba8430b158caff99111c4c888195ff6";

const chains = [bsc, bscTestnet];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 2, chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const rpcUrl = "";

export const API = "http://localhost:8085";
export const ADDRESS_CONTRACT = "0x2F498A1b1f7e5f30C48DBFc75eAdc2712C97BED1";