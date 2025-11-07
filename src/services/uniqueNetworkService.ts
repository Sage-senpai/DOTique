// src/services/uniqueNetworkService.ts


import { web3FromAddress } from '@polkadot/extension-dapp';
import { supabase } from './supabase';

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
   * Mint a new NFT token
   */
  async mintToken(config: MintConfig): Promise<{
    tokenId: string;
    collectionId: string;
    txHash: string;
    nftId: string;
  }> {
    try {
      // Get or create default collection
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
          // Create default collection
          const collection = await this.createCollection(
            {
              name: 'Dotique Collection',
              description: 'Fashion NFTs created on Dotique',
              tokenPrefix: 'DOTQ',
            },
            config.ownerAddress
          );
          collectionId = collection.collectionId;
          
          // Mark as default
          await supabase
            .from('collections')
            .update({ is_default: true })
            .eq('collection_id', collectionId);
        }
      }

      // Mock minting - replace with actual Unique Network SDK call
      const tokenId = `TOKEN_${Date.now()}`;
      const txHash = `0x${Math.random().toString(16).slice(2)}`;

      // Save NFT to database
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
          rarity: config.metadata.attributes.find(a => a.trait_type === 'Rarity')?.value || 'common',
          royalty: config.royalty,
          price: config.price || 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Auto-add to wardrobe
      await supabase.from('wardrobe_nfts').insert({
        user_id: config.ownerAddress,
        nft_id: nft.id,
        is_visible: true,
        is_featured: false,
      });

      // Track analytics
      await this.trackMint(config.ownerAddress, tokenId, config.metadata);

      return {
        tokenId,
        collectionId: collectionId!,
        txHash,
        nftId: nft.id,
      };
    } catch (error) {
      console.error('Failed to mint NFT:', error);
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