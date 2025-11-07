// src/hooks/useWardrobe.ts 
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { useWallet } from '../contexts/WalletContext';

export function useWardrobe() {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedAccount } = useWallet();

  const fetchWardrobe = useCallback(async () => {
    if (!selectedAccount) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wardrobe_nfts')
        .select(`
          *,
          nfts!inner (
            *,
            profiles:creator_id (
              username,
              display_name,
              dotvatar_url
            )
          )
        `)
        .eq('user_id', selectedAccount.address)
        .eq('is_visible', true)
        .order('added_at', { ascending: false });

      if (error) throw error;

      setNfts(data || []);
    } catch (err) {
      console.error('Failed to fetch wardrobe:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedAccount]);

  useEffect(() => {
    fetchWardrobe();
  }, [fetchWardrobe]);

  const addToWardrobe = async (nftId: string) => {
    if (!selectedAccount) return;

    try {
      const { error } = await supabase.from('wardrobe_nfts').upsert({
        user_id: selectedAccount.address,
        nft_id: nftId,
        is_visible: true,
      });

      if (error) throw error;
      await fetchWardrobe();
    } catch (err) {
      console.error('Failed to add to wardrobe:', err);
      throw err;
    }
  };

  const removeFromWardrobe = async (nftId: string) => {
    if (!selectedAccount) return;

    try {
      const { error } = await supabase
        .from('wardrobe_nfts')
        .update({ is_visible: false })
        .eq('user_id', selectedAccount.address)
        .eq('nft_id', nftId);

      if (error) throw error;
      await fetchWardrobe();
    } catch (err) {
      console.error('Failed to remove from wardrobe:', err);
      throw err;
    }
  };

  const setFeatured = async (nftId: string, featured: boolean) => {
    if (!selectedAccount) return;

    try {
      // Unfeature all others first
      if (featured) {
        await supabase
          .from('wardrobe_nfts')
          .update({ is_featured: false })
          .eq('user_id', selectedAccount.address);
      }

      const { error } = await supabase
        .from('wardrobe_nfts')
        .update({ is_featured: featured })
        .eq('user_id', selectedAccount.address)
        .eq('nft_id', nftId);

      if (error) throw error;
      await fetchWardrobe();
    } catch (err) {
      console.error('Failed to set featured:', err);
      throw err;
    }
  };

  return {
    nfts,
    loading,
    fetchWardrobe,
    addToWardrobe,
    removeFromWardrobe,
    setFeatured,
  };
}