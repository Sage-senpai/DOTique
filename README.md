# DOTique 2.0

> **The Web3 Fashion Ecosystem on Polkadot** — Create, own, trade, and wear your digital identity.

DOTique is a production-grade Web3 SocialFi platform that merges fashion, blockchain ownership, and social expression. Built on Polkadot and powered by Unique Network's NFT runtime, DOTique lets creators mint fashion NFTs, build 3D DOTvatars, join NFT-gated communities, send and recieve messages, follow users and trade wearables on a live marketplace.

---

## Features

| Feature | Status |
|---|---|
| DOTvatar 3D avatar creator | ✅ Live |
| NFT Fashion Studio (canvas + export) | ✅ Live |
| Unique Network NFT minting pipeline | ✅ Live |
| IPFS / Pinata / Crust decentralised storage | ✅ Live |
| Social feed with real-time Supabase updates | ✅ Live |
| NFT-gated Communities | ✅ Live |
| Marketplace (list / buy / donate / repost) | ✅ Live |
| Polkadot.js / SubWallet / Talisman wallet support | ✅ Live |
| Dark + Light theme with system detection | ✅ Live |
| Transaction status tracking (pending → finalized) | ✅ Live |
| On-chain governance & DAO voting | 🔄 Beta |
| Cross-chain DOTvatar interoperability | 🗓 Roadmap |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 + TypeScript 5.9 |
| Routing | React Router DOM v7 |
| State | Zustand v5 + TanStack Query v5 |
| Blockchain | Polkadot API (smoldot light client) + `@polkadot/extension-dapp` |
| NFT Runtime | Unique Network REST SDK (`@unique-nft/sdk`) |
| Storage | Supabase (PostgreSQL + Auth + Realtime + Storage) |
| IPFS | Pinata + Infura + Crust Network |
| 3D Rendering | `@react-three/fiber` + `@react-three/drei` |
| Animation | Framer Motion + GSAP |
| Styling | Tailwind CSS v4 + SCSS modules |
| Design tokens | DOTique Design System (Pink · Green · Navy brand scale) |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- A Polkadot-compatible browser extension (Polkadot.js, SubWallet, or Talisman)

### Installation

```bash
git clone https://github.com/Sage-senpai/DOTique.git
cd DOTique
pnpm install
```

### Environment Variables

Create a `.env` file in the root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Unique Network (Opal testnet or mainnet)
VITE_UNIQUE_API_URL=https://rest.unique.network/opal/v1

# IPFS / Pinata
VITE_PINATA_JWT=your_pinata_jwt
VITE_CRUST_JWT=your_crust_jwt

# Backend proxy (for IPFS uploads)
VITE_SERVER_URL=http://localhost:4000

# Polkadot RPC (optional override)
VITE_POLKADOT_RPC_URL=wss://rpc.polkadot.io
```

> If `VITE_UNIQUE_API_URL` is not set, the mint pipeline uses a clearly-labelled development stub. Set it to a real Unique Network node for live on-chain minting.

### Running

```bash
pnpm dev        # development server at http://localhost:5173
pnpm build      # production build
pnpm preview    # preview production build
pnpm typecheck  # TypeScript strict check
pnpm lint       # ESLint
```

---

## Architecture

```
src/
├── components/         Shared UI components
│   ├── Homepage/       Feed layout (LeftSidebar, FeedCenter, RightSidebar)
│   ├── NFT/            NFT card, mint modal, filter tabs
│   ├── Posts/          PostCard, PostActions, CreatePostModal
│   ├── Toast/          Global toast notification system
│   └── Skeletons/      Skeleton loaders
├── contexts/           React context providers
│   ├── ThemeContext     Light/dark/system theme engine
│   ├── WalletContext    Substrate wallet lifecycle (7-day session)
│   └── NFTContext       NFT state
├── hooks/              Custom hooks (useMint, useNFT, usePost, ...)
├── router/             App routing (React Router DOM)
├── screens/            Full-page screen components
│   ├── Auth/           Login, Signup, ForgotPassword
│   ├── Home/           Main social feed
│   ├── Marketplace/    NFT marketplace
│   ├── NFTstudio/      Canvas design studio
│   ├── DOTvatar/       3D avatar creator
│   ├── Communities/    NFT-gated communities
│   ├── Profile/        User profiles, wardrobe, governance
│   └── Messages/       Direct messaging
├── services/           Business logic and API layer
│   ├── supabase.ts      Supabase client singleton
│   ├── polkadotService  Substrate wallet + RPC connection
│   ├── uniqueNetworkService  On-chain NFT minting (real SDK)
│   ├── ipfsService      Pinata + Infura + Crust upload
│   ├── transactionQueueService  Tx status tracking
│   ├── retryService     Exponential backoff utility
│   ├── realtimeRecoveryService  Supabase realtime reconnect
│   └── errorService     Sentry-ready global error reporting
├── stores/             Zustand state slices
├── styles/             Global design tokens + App.scss
├── types/              Shared TypeScript types
└── utils/              Helpers (secureStore, formatters, validators)
```

---

## NFT Minting Pipeline

```
User triggers mint
  → useMintNFT hook
  → uploadToIPFS  (image → ipfs://CID  via Pinata/backend)
  → uniqueNetworkService.mintToken()
      → build tx via Unique Network REST API
      → sign with Polkadot.js injector (browser extension)
      → submit → receive txHash
  → transactionQueueService  (pending → in-block → finalized)
  → Persist to Supabase  (nfts + wardrobe_nfts tables)
  → Toast notification + optimistic UI update
```

---

## Design System

Three-colour brand palette with full 50–900 CSS custom property scales:

| Token | Hex | Role |
|---|---|---|
| `--dt-color-pink-300` | `#FFB6C1` | CTA buttons, primary actions |
| `--dt-color-green-500` | `#228B22` | Success states, highlights |
| `--dt-color-navy-500` | `#000080` | Text, icons, deep contrast |

Tokens switch automatically between dark (default) and light mode via the `[data-theme]` attribute set by `ThemeContext`.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

MIT
