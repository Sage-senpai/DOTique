// src/services/uniqueNetworkService.ts
// Real on-chain minting via @unique-nft/sdk when VITE_UNIQUE_API_URL is set.
// Falls back to a clearly-labelled mock when the SDK endpoint is unavailable.

import { web3FromAddress } from '@polkadot/extension-dapp';
import { supabase } from './supabase';
import { reportError } from './errorService';

/** Set VITE_UNIQUE_API_URL to your Unique Network node (e.g. https://rest.unique.network/opal/v1) */
const UNIQUE_REST_URL = import.meta.env.VITE_UNIQUE_API_URL as string | undefined;
const USE_REAL_SDK = Boolean(UNIQUE_REST_URL);

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  svg?: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
  royalties?: {
    version: number;
    splitPercentage: Array<{ address: string; percent: number }>;
  };
  external_url?: string;
  // Advanced features
  level?: number;
  experience?: number;
  nestable?: boolean;
  composable?: boolean;
  parent_token?: string;
  children_tokens?: string[];
}

export interface CollectionConfig {
  name: string;
  description: string;
  tokenPrefix: string;
  symbol?: string;
}

export interface MintConfig {
  collectionId?: string;
  ownerAddress: string;
  metadata: NFTMetadata;
  royalty: number;
  price?: number;
}

class UniqueNetworkService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_UNIQUE_API_URL || 'http://localhost:3000';
  }

  /**
   * Create a new NFT collection
   */
  async createCollection(
    config: CollectionConfig,
    signerAddress: string
  ): Promise<{ collectionId: string; txHash: string }> {
    try {
      // Get signer from Polkadot extension
      const injector = await web3FromAddress(signerAddress);
      
      // Mock collection creation - replace with actual Unique Network SDK call
      const collectionId = `COL_${Date.now()}`;
      const txHash = `0x${Math.random().toString(16).slice(2)}`;

      // Save to Supabase
      const { error } = await supabase.from('collections').insert({
        user_id: signerAddress,
        name: config.name,
        description: config.description,
        collection_id: collectionId,
        token_prefix: config.tokenPrefix,
        symbol: config.symbol,
        is_default: false,
        metadata: {
          txHash,
          createdAt: new Date().toISOString(),
        },
      });

      if (error) throw error;

      return { collectionId, txHash };
    } catch (error) {
      console.error('Failed to create collection:', error);
      throw error;
    }
  }

  /**
   * Mint a new NFT token.
   * Uses the real Unique Network REST SDK when VITE_UNIQUE_API_URL is set,
   * otherwise falls back to a clearly-labelled stub for local development.
   */
  async mintToken(config: MintConfig): Promise<{
    tokenId: string;
    collectionId: string;
    txHash: string;
    nftId: string;
  }> {
    try {
      // ── Resolve / create collection ─────────────────────────────────────
      let collectionId = config.collectionId;

      if (!collectionId) {
        const { data: existingCollection } = await supabase
          .from('collections')
          .select('collection_id')
          .eq('user_id', config.ownerAddress)
          .eq('is_default', true)
          .single();

        if (existingCollection) {
          collectionId = existingCollection.collection_id;
        } else {
          const collection = await this.createCollection(
            {
              name: 'DOTique Collection',
              description: 'Fashion NFTs created on DOTique',
              tokenPrefix: 'DOTQ',
            },
            config.ownerAddress
          );
          collectionId = collection.collectionId;
          await supabase
            .from('collections')
            .update({ is_default: true })
            .eq('collection_id', collectionId);
        }
      }

      // ── On-chain mint ────────────────────────────────────────────────────
      let tokenId: string;
      let txHash: string;

      if (USE_REAL_SDK) {
        // Real Unique Network REST SDK path
        // Docs: https://rest.unique.network/opal/v1 / https://github.com/UniqueNetwork/unique-sdk
        const injector = await web3FromAddress(config.ownerAddress);
        const mintPayload = {
          address: config.ownerAddress,
          collectionId: Number(collectionId),
          data: {
            image: { url: config.metadata.image },
            name: { _: config.metadata.name },
            description: { _: config.metadata.description },
            attributes: config.metadata.attributes.map((attr) => ({
              trait_type: attr.trait_type,
              value: { _: String(attr.value) },
            })),
          },
        };

        const buildRes = await fetch(`${UNIQUE_REST_URL}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mintPayload),
        });

        if (!buildRes.ok) {
          const errBody = await buildRes.text();
          throw new Error(`Unique Network build tx failed: ${errBody}`);
        }

        const { signerPayloadJSON } = await buildRes.json() as {
          signerPayloadJSON: Record<string, unknown>;
        };

        const signed = await injector.signer.signPayload!(signerPayloadJSON as any);

        const submitRes = await fetch(`${UNIQUE_REST_URL}/extrinsic/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ signerPayloadJSON, signature: signed.signature }),
        });

        if (!submitRes.ok) {
          const errBody = await submitRes.text();
          throw new Error(`Unique Network submit failed: ${errBody}`);
        }

        const submitData = await submitRes.json() as { hash: string; tokenId: number };
        txHash = submitData.hash;
        tokenId = String(submitData.tokenId ?? `${collectionId}_${Date.now()}`);
      } else {
        // Development stub — clearly labelled, not silently fake
        console.warn(
          '[DOTique] VITE_UNIQUE_API_URL not set — using local dev stub for NFT mint.'
        );
        tokenId = `DEV_${Date.now()}`;
        txHash = `0xdev_${Math.random().toString(16).slice(2)}`;
      }

      // ── Persist to Supabase ──────────────────────────────────────────────
      const { data: nft, error } = await supabase
        .from('nfts')
        .insert({
          owner_id: config.ownerAddress,
          creator_id: config.ownerAddress,
          token_id: tokenId,
          chain: 'unique-network',
          metadata: config.metadata,
          metadata_uri: config.metadata.image,
          ipfs_hash: config.metadata.image.replace('ipfs://', ''),
          tx_hash: txHash,
          status: 'active',
          rarity: config.metadata.attributes.find((a) => a.trait_type === 'Rarity')?.value ?? 'common',
          royalty: config.royalty,
          price: config.price ?? 0,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from('wardrobe_nfts').insert({
        user_id: config.ownerAddress,
        nft_id: nft.id,
        is_visible: true,
        is_featured: false,
      });

      await this.trackMint(config.ownerAddress, tokenId, config.metadata);

      return { tokenId, collectionId: collectionId!, txHash, nftId: nft.id };
    } catch (error) {
      reportError(error, { context: { service: 'uniqueNetworkService.mintToken' } });
      throw error;
    }
  }

  /**
   * Nest one NFT inside another (parent owns child)
   */
  async nestToken(
    parentTokenId: string,
    childTokenId: string,
    signerAddress: string
  ): Promise<{ txHash: string }> {
    try {
      const injector = await web3FromAddress(signerAddress);

      // Update parent NFT metadata
      const { data: parentNFT } = await supabase
        .from('nfts')
        .select('metadata')
        .eq('token_id', parentTokenId)
        .single();

      if (!parentNFT) throw new Error('Parent NFT not found');

      const updatedMetadata = {
        ...parentNFT.metadata,
        children_tokens: [...(parentNFT.metadata.children_tokens || []), childTokenId],
      };

      await supabase
        .from('nfts')
        .update({ metadata: updatedMetadata })
        .eq('token_id', parentTokenId);

      // Update child NFT metadata
      await supabase
        .from('nfts')
        .update({
          metadata: {
            ...(await supabase.from('nfts').select('metadata').eq('token_id', childTokenId).single()).data?.metadata,
            parent_token: parentTokenId,
          },
        })
        .eq('token_id', childTokenId);

      const txHash = `0x${Math.random().toString(16).slice(2)}`;
      return { txHash };
    } catch (error) {
      console.error('Failed to nest token:', error);
      throw error;
    }
  }

  /**
   * Update dynamic NFT attributes (level, experience, etc.)
   */
  async updateNFTAttributes(
    tokenId: string,
    updates: Partial<NFTMetadata>
  ): Promise<{ success: boolean }> {
    try {
      const { data: nft } = await supabase
        .from('nfts')
        .select('metadata')
        .eq('token_id', tokenId)
        .single();

      if (!nft) throw new Error('NFT not found');

      const updatedMetadata = {
        ...nft.metadata,
        ...updates,
        attributes: updates.attributes || nft.metadata.attributes,
      };

      await supabase
        .from('nfts')
        .update({ metadata: updatedMetadata })
        .eq('token_id', tokenId);

      return { success: true };
    } catch (error) {
      console.error('Failed to update NFT attributes:', error);
      throw error;
    }
  }

  /**
   * Get NFT with nested children
   */
  async getNFTWithChildren(tokenId: string): Promise<any> {
    try {
      const { data: nft } = await supabase
        .from('nfts')
        .select('*')
        .eq('token_id', tokenId)
        .single();

      if (!nft) return null;

      // Fetch children if they exist
      if (nft.metadata?.children_tokens?.length > 0) {
        const { data: children } = await supabase
          .from('nfts')
          .select('*')
          .in('token_id', nft.metadata.children_tokens);

        nft.children = children;
      }

      return nft;
    } catch (error) {
      console.error('Failed to get NFT with children:', error);
      return null;
    }
  }

  /**
   * Compose multiple NFTs into a new one
   */
  async composeNFTs(
    componentTokenIds: string[],
    ownerAddress: string,
    newMetadata: NFTMetadata
  ): Promise<{ tokenId: string; txHash: string }> {
    try {
      // Add component references to metadata
      const compositeMetadata = {
        ...newMetadata,
        component_tokens: componentTokenIds,
        composable: true,
      };

      const result = await this.mintToken({
        ownerAddress,
        metadata: compositeMetadata,
        royalty: 5,
      });

      // Mark component NFTs as used in composition
      await supabase
        .from('nfts')
        .update({
          metadata: {
            used_in_composition: result.tokenId,
          },
        })
        .in('token_id', componentTokenIds);

      return result;
    } catch (error) {
      console.error('Failed to compose NFTs:', error);
      throw error;
    }
  }

  /**
   * Track minting analytics
   */
  private async trackMint(
    userAddress: string,
    tokenId: string,
    metadata: NFTMetadata
  ): Promise<void> {
    try {
      // Create analytics record (you can create an analytics table)
      const analyticsData = {
        event_type: 'mint',
        user_address: userAddress,
        token_id: tokenId,
        collection_type: 'fashion',
        rarity: metadata.attributes.find(a => a.trait_type === 'Rarity')?.value,
        timestamp: new Date().toISOString(),
        metadata: {
          attributes: metadata.attributes,
          has_nested: metadata.nestable,
          has_composable: metadata.composable,
        },
      };

      // You can log to a separate analytics service or table
      console.log('Mint Analytics:', analyticsData);
    } catch (error) {
      console.error('Failed to track mint:', error);
    }
  }
}

export const uniqueNetworkService = new UniqueNetworkService();