import type { ChainId } from "@reactive-dot/core";
import { type WsJsonRpcProvider } from "polkadot-api/ws-provider";
export declare const config: import("@reactive-dot/core").Config<{
    readonly paseo: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
    readonly paseoPeople: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
    readonly paseoAssetHub: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
    readonly polkadot: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
    readonly polkadotPeople: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
    readonly polkadotAssetHub: {
        readonly descriptor: any;
        readonly provider: WsJsonRpcProvider;
        readonly name: string;
        readonly explorerUrl: string;
        readonly symbol: string;
        readonly decimals: number;
        readonly logo: string;
    };
}, ("paseo" | "paseoPeople" | "paseoAssetHub" | "polkadot" | "polkadotPeople" | "polkadotAssetHub")[]>;
export type ChainIdWithIdentity = Extract<keyof typeof config.chains, "polkadotPeople" | "paseoPeople">;
export declare function isChainWithIdentity(chainId: ChainId): chainId is ChainIdWithIdentity;
export type ChainIdsWithPalletAssets = Extract<keyof typeof config.chains, "polkadotAssetHub" | "paseoAssetHub">;
export declare function isChainWithPalletAssets(chainId: ChainId): chainId is ChainIdsWithPalletAssets;
//# sourceMappingURL=reactive-dot.config.d.ts.map