import type { NFTMintData } from '../stores/nftStore';
export declare function useNFT(): {
    nftDraft: NFTMintData | null;
    minting: boolean;
    mintError: string | null;
    updateNFTDraft: (draft: NFTMintData | null) => void;
    mintNFT: (nftData: NFTMintData) => Promise<{
        tokenId: string;
        txHash: string;
        blockHash: string;
    }>;
};
//# sourceMappingURL=useNFT.d.ts.map