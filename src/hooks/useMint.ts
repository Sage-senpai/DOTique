// src/hooks/useMint.ts (Updated)
// ==========================================

import { useState, useCallback } from 'react';
import { uniqueNetworkService } from '../services/uniqueNetworkService';
import { useWallet } from '../contexts/WalletContext';
import { uploadToIPFS } from '../services/ipfsService';

export interface MintResponse {
  tokenId: string;
  collectionId: string;
  txHash: string;
  nftId: string;
  success: boolean;
}

export function useMintNFT() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { selectedAccount } = useWallet();

  const mint = useCallback(
    async ({
      metadata,
      royalty = 5,
      price = 0,
      collectionId,
    }: {
      metadata: any;
      royalty?: number;
      price?: number;
      collectionId?: string;
    }): Promise<MintResponse> => {
      if (!selectedAccount) {
        throw new Error('No wallet connected');
      }

      setLoading(true);
      setError(null);

      try {
        // Upload image to IPFS if it's base64
        let imageUrl = metadata.image;
        if (metadata.image?.startsWith('data:')) {
          const uploadResult = await uploadToIPFS({
            content: metadata.image,
            fileName: `${metadata.name}.png`,
            contentType: 'image/png',
          });
          imageUrl = uploadResult.url;
        }

        // Prepare full metadata
        const fullMetadata = {
          ...metadata,
          image: imageUrl,
          royalties: {
            version: 1,
            splitPercentage: [
              {
                address: selectedAccount.address,
                percent: royalty,
              },
            ],
          },
        };

        // Mint via Unique Network
        const result = await uniqueNetworkService.mintToken({
          collectionId,
          ownerAddress: selectedAccount.address,
          metadata: fullMetadata,
          royalty,
          price,
        });

        return {
          ...result,
          success: true,
        };
      } catch (err: any) {
        console.error('Mint error:', err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [selectedAccount]
  );

  return {
    mint,
    loading,
    error,
  };
}