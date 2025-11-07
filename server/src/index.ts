// server/src/index.ts
// ==========================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ipfsRoutes from './routes/ipfs';
import nftRoutes from './routes/nft';
import draftsRoutes from './routes/drafts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/ipfs', ipfsRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/drafts', draftsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 IPFS: /api/ipfs`);
  console.log(`🎨 NFT: /api/nft`);
  console.log(`📝 Drafts: /api/drafts`);
});
