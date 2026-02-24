import { useState, useCallback, useEffect } from "react";
import { uniqueNetworkService } from "../services/uniqueNetworkService";
import { useWallet } from "../contexts/WalletContext";
import { uploadToIPFS } from "../services/ipfsService";
import {
  transactionQueueService,
  type MintTransactionState,
} from "../services/transactionQueueService";

export interface MintResponse {
  tokenId: string;
  collectionId: string;
  txHash: string;
  nftId: string;
  success: boolean;
  queueId: string;
  status: MintTransactionState["status"];
}

export function useMintNFT() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activeQueueId, setActiveQueueId] = useState<string | null>(null);
  const [transactionState, setTransactionState] = useState<MintTransactionState | null>(null);
  const { selectedAccount } = useWallet();

  useEffect(() => {
    const unsubscribe = transactionQueueService.subscribe((state) => {
      if (activeQueueId && state.id === activeQueueId) {
        setTransactionState(state);
      }
    });

    return unsubscribe;
  }, [activeQueueId]);

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
        throw new Error("No wallet connected");
      }
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        throw new Error("You are offline. Reconnect to mint NFT.");
      }

      setLoading(true);
      setError(null);
      setTransactionState(null);
      setActiveQueueId(null);

      try {
        let imageUrl = metadata.image;
        if (metadata.image?.startsWith("data:")) {
          const uploadResult = await uploadToIPFS({
            content: metadata.image,
            fileName: `${metadata.name}.png`,
            contentType: "image/png",
          });
          imageUrl = uploadResult.url;
        }

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

        const { queueId, result, finalState } = await transactionQueueService.runMint(
          () =>
            uniqueNetworkService.mintToken({
              collectionId,
              ownerAddress: selectedAccount.address,
              metadata: fullMetadata,
              royalty,
              price,
            }),
          3
        );

        setActiveQueueId(queueId);
        setTransactionState(finalState);

        return {
          ...result,
          success: true,
          queueId,
          status: finalState.status,
        };
      } catch (err) {
        const mintError = err instanceof Error ? err : new Error("Mint failed");
        setError(mintError);
        throw mintError;
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
    transactionState,
    activeQueueId,
  };
}
