// server/src/routes/ipfs.ts
// ==========================================

import express, { Request, Response } from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload file to Pinata IPFS
 */
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const form = new FormData();
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      return res.status(500).json({ error: 'Pinata credentials not configured' });
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pinataApiKey}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Pinata error:', errorData);
      return res.status(500).json({ error: 'Failed to upload to IPFS', details: errorData });
    }

    const data: any = await response.json();

    return res.json({
      success: true,
      cid: data.IpfsHash,
      url: `ipfs://${data.IpfsHash}`,
      gateway: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
    });
  } catch (error: any) {
    console.error('IPFS upload error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * Upload JSON metadata to Pinata IPFS
 */
router.post('/upload-json', async (req: Request, res: Response) => {
  try {
    const metadata = req.body;

    if (!metadata) {
      return res.status(400).json({ error: 'No metadata provided' });
    }

    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      return res.status(500).json({ error: 'Pinata credentials not configured' });
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pinataApiKey}`,
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Pinata error:', errorData);
      return res.status(500).json({ error: 'Failed to upload JSON to IPFS', details: errorData });
    }

    const data: any = await response.json();

    return res.json({
      success: true,
      cid: data.IpfsHash,
      url: `ipfs://${data.IpfsHash}`,
      gateway: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
    });
  } catch (error: any) {
    console.error('IPFS JSON upload error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router;