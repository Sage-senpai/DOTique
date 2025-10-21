export interface ChainConfig {
    readonly endpoints: string[];
    readonly displayName: string;
    readonly isTestnet: boolean;
    readonly icon?: string;
    readonly explorerUrls?: Partial<Record<keyof typeof SubstrateExplorer, string>>;
    readonly faucetUrls?: string[];
}
export declare const SubstrateExplorer: {
    readonly Subscan: "Subscan";
    readonly PolkadotJs: "PolkadotJs";
    readonly PapiExplorer: "PapiExplorer";
};
export declare const JsonRpcApi: {
    readonly LEGACY: "legacy";
    readonly NEW: "new";
};
export type JsonRpcApi = (typeof JsonRpcApi)[keyof typeof JsonRpcApi];
export interface PolkadotIdentity {
    display?: string | number;
    legal?: string | number;
    email?: string | number;
    twitter?: string | number;
    github?: string | number;
    discord?: string | number;
    matrix?: string | number;
    riot?: string | number;
    web?: string | number;
    image?: string | number;
    verified?: boolean;
}
export interface IdentitySearchResult {
    address: string;
    identity: PolkadotIdentity;
}
export declare const ClientConnectionStatus: {
    readonly NotConnected: "NotConnected";
    readonly Connecting: "Connecting";
    readonly Connected: "Connected";
    readonly Error: "Error";
};
export type ClientConnectionStatus = (typeof ClientConnectionStatus)[keyof typeof ClientConnectionStatus];
export interface NetworkInfoLike<TNetworkId extends string = string> {
    id: TNetworkId;
    name: string;
    logo?: string;
    subscanUrl?: string;
    pjsUrl?: string;
    symbol?: string;
    decimals?: number;
}
export type TxResultLike = {
    status: {
        type: string;
    };
    txHash?: string;
};
export interface BlockInfoLike {
    number: number;
    hash: string;
}
export interface UseBlockInfoLike {
    best?: BlockInfoLike;
    finalized?: BlockInfoLike;
}
export type AnyFn = (...args: any[]) => any;
export interface TxAdapter<TxFn extends AnyFn = AnyFn> {
    inProgress: boolean;
    inBestBlockProgress?: boolean;
    signAndSend: (opts: {
        args: Parameters<TxFn>;
        callback: (result: TxResultLike) => void;
    }) => Promise<void>;
}
export type ExtractTxFn<TTx> = TTx extends TxAdapter<infer U> ? U : never;
export interface TokenInfo {
    id: string;
    symbol: string;
    decimals: number;
    name: string;
    assetId: string;
    coingeckoId?: string;
    logo?: string;
}
export interface ChainInfo {
    id: string;
    name: string;
    logo?: string;
    nativeTokenId?: string;
    nativeCurrency?: {
        decimals: number;
        symbol: string;
        name: string;
        coingeckoId?: string;
        logo?: string;
    };
    platform?: string;
    isTestnet?: boolean;
    isDefault?: boolean;
}
export interface TokenMetadata {
    assetId: number;
    name: string;
    symbol: string;
    decimals: number;
    deposit?: bigint;
    isFrozen?: boolean;
}
//# sourceMappingURL=types.dot-ui.d.ts.map