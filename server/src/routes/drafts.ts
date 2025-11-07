// server/src/routes/drafts.ts
// ==========================================

import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

/**
 * Get user drafts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const { data: drafts, error } = await supabase
      .from('drafts')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return res.json({
      success: true,
      drafts: drafts || [],
    });
  } catch (error: any) {
    console.error('Get drafts error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get drafts' });
  }
});

/**
 * Create draft
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const draft = req.body;

    const { data, error } = await supabase
      .from('drafts')
      .insert(draft)
      .select()
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      draft: data,
    });
  } catch (error: any) {
    console.error('Create draft error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create draft' });
  }
});

/**
 * Update draft
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('drafts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      draft: data,
    });
  } catch (error: any) {
    console.error('Update draft error:', error);
    return res.status(500).json({ error: error.message || 'Failed to update draft' });
  }
});

/**
 * Delete draft
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('drafts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.json({
      success: true,
      message: 'Draft deleted',
    });
  } catch (error: any) {
    console.error('Delete draft error:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete draft' });
  }
});

export default router;
