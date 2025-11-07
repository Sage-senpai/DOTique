// src/hooks/useNFTComposition.ts (NEW)
import { useState } from 'react';
import { uniqueNetworkService } from '../services/uniqueNetworkService';

export function useNFTComposition() {
  const [loading, setLoading] = useState(false);

  const composeNFTs = async (
    componentTokenIds: string[],
    ownerAddress: string,
    newName: string,
    newDescription: string
  ) => {
    setLoading(true);
    try {
      const result = await uniqueNetworkService.composeNFTs(
        componentTokenIds,
        ownerAddress,
        {
          name: newName,
          description: newDescription,
          image: '', // Will be generated
          attributes: [
            { trait_type: 'Type', value: 'Composite' },
            { trait_type: 'Components', value: componentTokenIds.length },
          ],
          composable: true,
        }
      );

      return result;
    } catch (error) {
      console.error('Failed to compose NFTs:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const nestNFT = async (
    parentTokenId: string,
    childTokenId: string,
    signerAddress: string
  ) => {
    setLoading(true);
    try {
      const result = await uniqueNetworkService.nestToken(
        parentTokenId,
        childTokenId,
        signerAddress
      );
      return result;
    } catch (error) {
      console.error('Failed to nest NFT:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    composeNFTs,
    nestNFT,
    loading,
  };
}