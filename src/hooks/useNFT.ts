// ==================== src/hooks/useNFT.ts ====================
import { useCallback } from 'react';
import { useNFTStore } from '../stores/nftStore';
import type { NFTMintData } from '../stores/nftStore';

export function useNFT() {
  const { nftDraft, minting, mintError, setNFTDraft, setMinting, setMintError } = useNFTStore();

  const updateNFTDraft = useCallback((draft: NFTMintData | null) => {
    setNFTDraft(draft);
  }, [setNFTDraft]);

  const mintNFT = useCallback(async (nftData: NFTMintData) => {
  setMinting(true);
  setMintError(null);
  try {
    // TEMP: log to suppress unused-var warning until mintService is ready
    console.log("Minting NFT:", nftData);

    // TODO: replace this with actual service call
    const result = {
      tokenId: Date.now().toString(),
      txHash: '0x' + Math.random().toString(16).slice(2),
      blockHash: '0x' + Math.random().toString(16).slice(2),
    };
    setNFTDraft(null);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to mint NFT';
    setMintError(errorMessage);
    throw error;
  } finally {
    setMinting(false);
  }
}, [setMinting, setMintError, setNFTDraft]);


  return {
    nftDraft,
    minting,
    mintError,
    updateNFTDraft,
    mintNFT,
  };
}