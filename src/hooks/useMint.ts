// src/hooks/useMint.ts
import { useState } from "react";
import { polkadotService } from "../services/polkadotService";

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

export const useMintNFT = () => {
  const [isMinting, setIsMinting] = useState(false);

  async function mint({ metadata, royalty = 5, edition = 1 }: MintArgs): Promise<MintResponse> {
    setIsMinting(true);
    try {
      const metadataUri = metadata.metadataUri ?? metadata.image;
      if (!metadataUri) throw new Error("No metadata URI provided for minting.");

      const resp = await polkadotService.mintNFT({
        metadataUri,
        ownerAddress: metadata.ownerAddress ?? "",
        royalty,
        edition,
      });

      // Return normalized response — works even if tokenId doesn’t exist
      return {
        ...resp,
        blockHash: resp.txHash, // fallback alias for clarity
        tokenId: (resp as any).tokenId ?? undefined,
        nftId: (resp as any).nftId ?? (resp as any).tokenId ?? undefined,
      };
    } catch (err) {
      console.error("Minting failed:", err);
      throw err;
    } finally {
      setIsMinting(false);
    }
  }

  return { isMinting, mint };
};

export default useMintNFT;
