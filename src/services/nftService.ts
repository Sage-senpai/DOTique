// ==================== src/services/nftService.ts ====================
import { uploadToIPFS } from './ipfsService';
import { polkadotService } from './polkadotService';

export const nftService = {
  async uploadNFTMedia(file: File) {
    try {
      const result = await uploadToIPFS({
        content: file,
        fileName: file.name,
        contentType: file.type,
      });
      return result.url;
    } catch (error) {
      console.error('Failed to upload NFT media:', error);
      throw error;
    }
  },

  async mintNFT(nftData: any, walletAddress: string) {
    try {
      // TODO: Call polkadotService.mintNFT()
      const result = await polkadotService.mintNFT({
        metadataUri: nftData.imageUrl,
        ownerAddress: walletAddress,
        royalty: nftData.royalty,
        edition: 1,
      });
      return result;
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      throw error;
    }
  },

  async saveNFTMetadata(userId: string, nftData: any) {
    try {
      const { data, error } = await supabase
        .from('nfts')
        .insert([{
          user_id: userId,
          title: nftData.title,
          description: nftData.description,
          price: nftData.price,
          rarity: nftData.rarity,
          image_url: nftData.imageUrl,
          royalty: nftData.royalty,
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Failed to save NFT metadata:', error);
      throw error;
    }
  },
};