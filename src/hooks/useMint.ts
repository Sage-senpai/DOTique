// src/hooks/useMintNFT.ts
import { useState } from "react";
import { polkadotService }from "../services/polkadotService";

/**
 * Hook for minting NFTs via PolkadotService
 * - Returns isMinting boolean and a mint function.
 * - The mint function expects metadata already uploaded to IPFS (or a metadataUrl).
 *
 * NOTE:
 * - This hook intentionally does not perform metadata uploads to avoid
 *   duplicating upload logic. Keep upload responsibilities outside (ipfsService).
 * - It returns minted identifiers from PolkadotService (or simulated response on web).
 */

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

export const useMintNFT = () => {
  const [isMinting, setIsMinting] = useState(false);

  async function mint({ metadata, royalty = 5, edition = 1 }: MintArgs) {
    setIsMinting(true);
    try {
      // Ensure we have a metadata URI to use for on-chain metadata
      const metadataUri = metadata.metadataUri ?? metadata.image;
      if (!metadataUri) {
        throw new Error("No metadata URI provided for minting.");
      }

      // Use the PolkadotService instance (handles web simulation vs native)
      const resp = await polkadotService.mintNFT({
        metadataUri,
        ownerAddress: metadata.ownerAddress ?? "",
        royalty,
        edition,
      });

      // resp should include tokenId/txHash/blockHash — return a normalized shape
      return {
        tokenId: resp.tokenId,
        txHash: resp.txHash,
        blockHash: resp.blockHash ?? resp.txHash,
        raw: resp,
      };
    } catch (err) {
      // rethrow for caller to handle UI notifications
      throw err;
    } finally {
      setIsMinting(false);
    }
  }

  return { isMinting, mint };
};

export default useMintNFT;
