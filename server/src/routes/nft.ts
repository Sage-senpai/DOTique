// server/src/routes/nft.ts
// ==========================================

import express, { Request, Response } from 'express';
import Sdk from '@unique-nft/sdk';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const sdk = new Sdk({
  baseUrl: process.env.UNIQUE_API_URL || 'http://localhost:3000',
});

/**
 * Create a new collection
 */
router.post('/create-collection', async (req: Request, res: Response) => {
  try {
    const { name, description, tokenPrefix, ownerAddress, userId } = req.body;

    if (!name || !ownerAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create collection on-chain
    const result = await sdk.collection.create({
      address: ownerAddress,
      name,
      description: description || '',
      tokenPrefix: tokenPrefix || 'NFT',
      mode: 'NFT',
    });

    // Save to database
    const { data: collection, error: dbError } = await supabase
      .from('collections')
      .insert({
        user_id: userId || ownerAddress,
        name,
        description,
        collectionId: result.parsed?.collectionId,
        token_prefix: tokenPrefix,
        metadata: {
          txHash: result.hash,
          createdAt: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save collection to database' });
    }

    return res.json({
      success: true,
      collection,
      collection_id: result.parsed?.collectionId?.toString(),
      tx_hash: result.hash,
    });
  } catch (error: any) {
    console.error('Create collection error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create collection' });
  }
});

/**
 * Mint NFT token
 */
router.post('/mint', async (req: Request, res: Response) => {
  try {
    const { collectionId, ownerAddress, metadata, userId, sponsorAddress } = req.body;

    if (!collectionId || !ownerAddress || !metadata) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Determine signer (use sponsor if provided for gasless minting)
    const signerAddress = sponsorAddress || ownerAddress;

    // Mint token on-chain
    const result = await sdk.token.create({
      address: signerAddress,
      collectionId: parseInt(collectionId),
      owner: ownerAddress,
      data: {
        encodedAttributes: {
          0: { _: metadata.metadata_uri || '' },
        },
        image: {
          url: metadata.image,
        },
      },
    });

    // Save NFT to database
    const { data: nft, error: dbError } = await supabase
      .from('nfts')
      .insert({
        owner_id: ownerAddress,
        creator_id: userId || ownerAddress,
        token_id: result.parsed?.tokenId?.toString(),
        collection_id: collectionId,
        chain: 'unique-network',
        metadata_uri: metadata.metadata_uri,
        metadata,
        ipfs_hash: metadata.ipfs_hash,
        tx_hash: result.hash,
        status: 'active',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save NFT to database' });
    }

    // Add to wardrobe automatically
    if (nft) {
      await supabase.from('wardrobe_nfts').insert({
        user_id: ownerAddress,
        nft_id: nft.id,
        is_visible: true,
      });
    }

    return res.json({
      success: true,
      nft,
      tokenId: result.parsed?.tokenId,
      txHash: result.hash,
    });
  } catch (error: any) {
    console.error('Mint error:', error);
    return res.status(500).json({ error: error.message || 'Failed to mint NFT' });
  }
});

/**
 * Transfer NFT
 */
router.post('/transfer', async (req: Request, res: Response) => {
  try {
    const { collectionId, tokenId, fromAddress, toAddress } = req.body;

    if (!collectionId || !tokenId || !fromAddress || !toAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await sdk.token.transfer({
      address: fromAddress,
      collectionId: parseInt(collectionId),
      tokenId: parseInt(tokenId),
      to: toAddress,
    });

    // Update database
    await supabase
      .from('nfts')
      .update({ owner_id: toAddress })
      .eq('token_id', tokenId.toString())
      .eq('chain', 'unique-network');

    return res.json({
      success: true,
      txHash: result.hash,
    });
  } catch (error: any) {
    console.error('Transfer error:', error);
    return res.status(500).json({ error: error.message || 'Failed to transfer NFT' });
  }
});

/**
 * Get NFT details
 */
router.get('/token/:collectionId/:tokenId', async (req: Request, res: Response) => {
  try {
    const { collectionId, tokenId } = req.params;

    const token = await sdk.token.get({
      collectionId: parseInt(collectionId),
      tokenId: parseInt(tokenId),
    });

    return res.json({
      success: true,
      token,
    });
  } catch (error: any) {
    console.error('Get token error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get token' });
  }
});

/**
 * ✅ Get tokens by owner (from Supabase)
 */
router.get('/tokens/owner/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const { collectionId } = req.query;

    const query = supabase
      .from('nfts')
      .select('*')
      .eq('owner_id', address);

    if (collectionId) {
      query.eq('collection_id', collectionId);
    }

    const { data: tokens, error } = await query;

    if (error) throw error;

    return res.json({
      success: true,
      tokens,
    });
  } catch (error: any) {
    console.error('Get tokens error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get tokens' });
  }
});

/**
 * Nest token (advanced feature)
 */
router.post('/nest', async (req: Request, res: Response) => {
  try {
    const {
      parentCollectionId,
      parentTokenId,
      childCollectionId,
      childTokenId,
      signerAddress,
    } = req.body;

    if (!parentCollectionId || !parentTokenId || !childCollectionId || !childTokenId || !signerAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await sdk.token.nest({
      address: signerAddress,
      parent: {
        collectionId: parseInt(parentCollectionId),
        tokenId: parseInt(parentTokenId),
      },
      nested: {
        collectionId: parseInt(childCollectionId),
        tokenId: parseInt(childTokenId),
      },
    });

    return res.json({
      success: true,
      txHash: result.hash,
    });
  } catch (error: any) {
    console.error('Nest token error:', error);
    return res.status(500).json({ error: error.message || 'Failed to nest token' });
  }
});

export default router;
