type MintArgs = {
    metadata: {
        metadataUri?: string;
        image?: string;
        ownerAddress?: string;
        [k: string]: any;
    };
    royalty?: number;
    edition?: number;
};
export type MintResponse = {
    success: boolean;
    txHash: string;
    metadataUri: string;
    owner: string;
    endpoint: string | null;
    tokenId?: string | number;
    nftId?: string | number;
    blockHash?: string | null;
};
export declare const useMintNFT: () => {
    isMinting: boolean;
    mint: ({ metadata, royalty, edition }: MintArgs) => Promise<MintResponse>;
};
export default useMintNFT;
//# sourceMappingURL=useMint.d.ts.map