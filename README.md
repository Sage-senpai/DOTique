# DOTique

**DOTique** is a Web3 fashion ecosystem built on **Polkadot**, merging digital identity, creativity, and ownership. Users can create fully customizable **DOTvatars** (3D avatars), design fashion items in an **NFT Fashion Studio** powered with **Unique Network**, join **NFT-gated communities**, showcase outfits on a social feed, and trade wearables on a marketplace. DOTique empowers creators and users to express themselves across metaverses, games, and social platforms.

---

## Built With

- **React + Vite** – Modern web framework for fast development  
- **TypeScript** – Type-safe, scalable codebase  
- **React Router DOM** – Routing and navigation  
- **Zustand** – State management  
- **@react-three/fiber** – 3D DOTvatar rendering  
- **React Native Skia** – NFT Fashion Studio drawing engine  
- **Supabase (PostgreSQL + Auth + Storage)** – Backend, database, and real-time features  
- **Polkadot.js** – Wallet integration, NFT transactions, blockchain interactions  
- **Unique Network** – NFT minting, metadata, wearables infrastructure  
- **IPFS / Pinata** – Decentralized storage for assets  
- **Node.js** – Scripts, utilities, and development tooling  
- **Figma + polkadot.ui.com** – UI/UX design  

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/dotique.git
cd dotique


Install dependencies

pnpm install
# or
npm install
# or
yarn install


Set up environment variables
Create a .env file in the root directory with:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_UNIQUE_NETWORK_API_KEY=your_unique_network_key
VITE_POLKADOT_ENDPOINT=wss://rpc.polkadot.io

Running the App
# Run in development mode
pnpm dev
# or
npm run dev
# or
yarn dev
