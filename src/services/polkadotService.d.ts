/**
 * 🌐 Polkadot Service — Vite + React + TypeScript
 *
 * ✅ Works with browser wallets (Polkadot.js / SubWallet / Talisman)
 * ✅ Connects to parachain for NFT minting and identity lookup
 * ✅ Supports message signing (Crust integration)
 * ✅ Includes fallback endpoints + retry logic
 */
export type PolkadotAccount = {
    address: string;
    name?: string;
    source?: string;
    chain?: string;
    verified?: boolean;
    identity?: {
        display?: string;
        email?: string;
        twitter?: string;
        web?: string;
    };
};
export type MintNFTArgs = {
    collectionId?: number;
    itemId?: number;
    metadataUri: string;
    ownerAddress: string;
    royalty?: number;
    edition?: number;
};
export type MintNFTResponse = {
    success: boolean;
    txHash: string;
    metadataUri: string;
    owner: string;
    endpoint: string | null;
    tokenId: string;
    blockHash?: string;
};
declare class PolkadotService {
    api: any;
    provider: any;
    connectedEndpoint: string | null;
    endpoints: string[];
    connect(wsEndpoint?: string): Promise<any>;
    enableExtensions(): Promise<any>;
    signMessage(address: string, message: string): Promise<string>;
    mintNFT({ collectionId, itemId, metadataUri, ownerAddress, royalty, edition, }: MintNFTArgs): Promise<MintNFTResponse>;
}
export declare function connectPolkadotWallets(): Promise<any>;
export declare const polkadotService: PolkadotService;
export {};
//# sourceMappingURL=polkadotService.d.ts.map