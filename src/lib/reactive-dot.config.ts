// ====================== src/lib/reactive-dot.config.ts ======================
import {
  paseo,
  paseo_asset_hub,
  paseo_people,
} from "@polkadot-api/descriptors";
import { defineConfig } from "@reactive-dot/core";
import type { ChainId } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import {
  getWsProvider,
  type WsJsonRpcProvider,
} from "polkadot-api/ws-provider";

// 🩵 Temporary placeholders for missing Polkadot descriptors
// Until official Polkadot descriptors are added to @polkadot-api/descriptors
const polkadot = { genesisHash: "", metadataRpc: "" } as unknown as any;
const polkadot_people = { genesisHash: "", metadataRpc: "" } as unknown as any;
const polkadot_asset_hub = { genesisHash: "", metadataRpc: "" } as unknown as any;

// 🌐 WebSocket Providers
const paseoPeopleProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://sys.ibp.network/people-paseo"
);
const polkadotPeopleProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://sys.ibp.network/people-polkadot"
);
const paseoProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://sys.ibp.network/paseo"
);
const paseoAssetHubProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://sys.ibp.network/asset-hub-paseo"
);
const polkadotAssetHubProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://sys.ibp.network/asset-hub-polkadot"
);
const polkadotProvider: WsJsonRpcProvider | null = getWsProvider(
  "wss://rpc.polkadot.io"
);

// 🧩 UI-friendly chain metadata (type helper)
type UIChainConfig = {
  name: string;
  explorerUrl: string;
  symbol: string;
  decimals: number;
  logo: string;
};

// ⚙️ ReactiveDot Configuration
export const config = defineConfig({
  ssr: true,
  chains: {
    paseo: {
      ...( {
        name: "Paseo",
        explorerUrl: "https://paseo.subscan.io",
        symbol: "PAS",
        decimals: 10,
        logo: "https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/refs/heads/master/packages/chain-list-assets/public/assets/chain-assets/paseotest-native-pas.png",
      } as UIChainConfig ),
      descriptor: paseo,
      provider: paseoProvider,
    },
    paseoPeople: {
      ...( {
        name: "Paseo People",
        explorerUrl: "https://people-paseo.subscan.io",
        symbol: "PAS",
        decimals: 10,
        logo: "https://people-paseo.subscan.io/_next/image?url=%2Fchains%2Fpeople-paseo%2Flogo-mini.png&w=256&q=75",
      } as UIChainConfig ),
      descriptor: paseo_people,
      provider: paseoPeopleProvider,
    },
    paseoAssetHub: {
      ...( {
        name: "Paseo Asset Hub",
        explorerUrl: "https://assethub-paseo.subscan.io",
        symbol: "PAS",
        decimals: 10,
        logo: "https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/refs/heads/master/packages/chain-list-assets/public/assets/chains/paseo_assethub.png",
      } as UIChainConfig ),
      descriptor: paseo_asset_hub,
      provider: paseoAssetHubProvider,
    },
    polkadot: {
      ...( {
        name: "Polkadot",
        explorerUrl: "https://polkadot.subscan.io",
        symbol: "DOT",
        decimals: 10,
        logo: "https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/refs/heads/master/packages/chain-list-assets/public/assets/chains/polkadot.png",
      } as UIChainConfig ),
      descriptor: polkadot,
      provider: polkadotProvider,
    },
    polkadotPeople: {
      ...( {
        name: "Polkadot People",
        explorerUrl: "https://people-polkadot.subscan.io",
        symbol: "DOT",
        decimals: 10,
        logo: "https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/refs/heads/master/packages/chain-list-assets/public/assets/chains/polkadot_people.png",
      } as UIChainConfig ),
      descriptor: polkadot_people,
      provider: polkadotPeopleProvider,
    },
    polkadotAssetHub: {
      ...( {
        name: "Polkadot Asset Hub",
        explorerUrl: "https://assethub-polkadot.subscan.io",
        symbol: "DOT",
        decimals: 10,
        logo: "https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/refs/heads/master/packages/chain-list-assets/public/assets/chains/polkadot_assethub.png",
      } as UIChainConfig ),
      descriptor: polkadot_asset_hub,
      provider: polkadotAssetHubProvider,
    },
  },
  wallets: [new InjectedWalletProvider()],
});

// 🧠 Type helpers for identity & pallet assets
export type ChainIdWithIdentity = Extract<
  keyof typeof config.chains,
  "polkadotPeople" | "paseoPeople"
>;

export function isChainWithIdentity(
  chainId: ChainId
): chainId is ChainIdWithIdentity {
  return chainId === "polkadotPeople" || chainId === "paseoPeople";
}

export type ChainIdsWithPalletAssets = Extract<
  keyof typeof config.chains,
  "polkadotAssetHub" | "paseoAssetHub"
>;

export function isChainWithPalletAssets(
  chainId: ChainId
): chainId is ChainIdsWithPalletAssets {
  return chainId === "polkadotAssetHub" || chainId === "paseoAssetHub";
}
