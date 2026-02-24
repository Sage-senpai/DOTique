import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const files = {
  "README.md": `# DOTique

**DOTique** is a Web3 fashion ecosystem built on **Polkadot**, merging digital identity, creativity, and NFT ownership. Users create fully customisable **DOTvatars** (3D on-chain avatars), design fashion NFTs in a browser-based studio powered by **Unique Network**, join **NFT-gated communities**, showcase outfits on a social feed, and trade wearables on a marketplace.

---

## Features

| Feature | Status |
|---|---|
| DOTvatar 3D avatar editor (@react-three/fiber) | ✅ |
| NFT Fashion Studio (canvas drawing engine) | ✅ |
| Social feed with tabs (Feed / Following / Friends / Communities) | ✅ |
| Marketplace — buy, donate, repost NFTs | ✅ |
| NFT-gated communities & events | ✅ |
| Polkadot wallet connect (SubWallet, Talisman, Polkadot.js) | ✅ |
| On-chain NFT minting via Unique Network REST SDK | ✅ |
| IPFS asset storage (Pinata + Infura + Crust) | ✅ |
| Real-time chat & notifications (Supabase Realtime) | ✅ |
| zkLogin (Google/Apple → ZK proof → Polkadot address) | 🚧 |
| Social API integrations (Instagram, Pinterest, X, Figma) | 🚧 |
| FashionVoting Substrate pallet (ink! contract) | 🚧 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 7 + TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 + SCSS Modules + CSS custom-property design tokens |
| State | Zustand v5 + TanStack Query v5 |
| 3D | @react-three/fiber + @react-three/drei + Three.js |
| Animation | Framer Motion + GSAP |
| Backend | Supabase (PostgreSQL + Auth + Realtime + RLS + Storage) |
| Blockchain | Polkadot API via smoldot in-browser light client |
| Wallet | @polkadot/extension-dapp (SubWallet, Talisman, Polkadot.js) |
| NFTs | @unique-nft/sdk + Unique Network REST API |
| IPFS | Pinata + Infura + Crust Network |
| Package manager | pnpm |

---

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Toast/           # Global toast notification system
│   ├── Homepage/        # Feed components
│   └── ...
├── screens/             # Page-level screens (Auth, Home, Profile, Marketplace, ...)
├── services/            # Pure async business logic
│   ├── errorService.ts  # Sentry-ready error reporting
│   ├── ipfsService.ts   # Unified IPFS upload
│   ├── polkadotService.ts
│   ├── uniqueNetworkService.ts
│   ├── socialApiService.ts    # Instagram / Pinterest / X / Figma OAuth
│   ├── zkLoginService.ts      # Google/Apple → ZK proof → Polkadot
│   └── realtimeRecoveryService.ts
├── stores/              # Zustand stores
├── hooks/               # React wrappers around services
├── types/               # TypeScript types
│   └── database.types.ts  # Full Supabase schema types
├── contexts/            # React contexts (Wallet, Theme, ...)
├── styles/              # Global SCSS + design tokens
└── router/              # React Router setup
\`\`\`

---

## Installation

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- A Supabase project
- A Unique Network API key (for on-chain minting)

### Steps

\`\`\`bash
git clone https://github.com/Sage-senpai/DOTique
cd dotique
pnpm install
\`\`\`

### Environment Variables

Create a \`.env\` file in the project root:

\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_UNIQUE_API_URL=https://rest.unique.network/unique
VITE_UNIQUE_NETWORK_API_KEY=your_unique_network_key
VITE_POLKADOT_ENDPOINT=wss://rpc.polkadot.io
VITE_PINATA_JWT=your_pinata_jwt
VITE_INFURA_IPFS_PROJECT_ID=your_infura_project_id
VITE_INFURA_IPFS_PROJECT_SECRET=your_infura_project_secret

# Optional — social OAuth (for social API integrations)
VITE_INSTAGRAM_CLIENT_ID=
VITE_PINTEREST_CLIENT_ID=
VITE_X_CLIENT_ID=
VITE_FIGMA_CLIENT_ID=

# Optional — zkLogin
VITE_GOOGLE_CLIENT_ID=
VITE_ZK_PROVER_URL=
\`\`\`

### Run in Development

\`\`\`bash
pnpm dev
\`\`\`

### Production Build

\`\`\`bash
pnpm build
pnpm preview
\`\`\`

---

## Architecture Notes

- **No \`alert()\`** — all notifications use the global \`useToast()\` hook from \`src/components/Toast/Toast.tsx\`
- **No raw hex colours** in TSX/SCSS — always use CSS custom properties from \`src/styles/App.scss\`
- **Services are pure async** (no React imports) — consumed via hooks in \`src/hooks/\`
- **Wallet sessions** persist for 7 days via AES-GCM encrypted localStorage (\`src/utils/secureStore.ts\`)
- **Bundle splitting** — react / polkadot / three / animation / supabase / ui vendor chunks via Vite \`manualChunks\`

---

## Database Schema (Supabase)

Core tables: \`profiles\`, \`social_accounts\`, \`nfts\`, \`dotvatar_items\`, \`user_nft_ownership\`, \`posts\`, \`follows\`, \`messages\`, \`voting_sessions\`, \`votes\`, \`events\`

TypeScript types live in \`src/types/database.types.ts\` (auto-generated via Supabase CLI or hand-maintained).

---

## Roadmap

| Quarter | Milestone |
|---|---|
| Q1 2026 | zkLogin (Google/Apple), social API import (Instagram, Pinterest, X) |
| Q2 2026 | FashionVoting ink! pallet on Unique parachain, NFT-gated events |
| Q3 2026 | DOTvatar cross-metaverse export (VRM, glTF), marketplace auction engine |
| Q4 2026 | Mobile app (React Native + Expo), full Substrate pallet suite |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming conventions, coding standards, and PR guidelines.

---

## License

MIT — see [LICENSE](LICENSE) for details.
`,
};

for (const [filePath, content] of Object.entries(files)) {
  mkdirSync(dirname(filePath) || ".", { recursive: true });
  writeFileSync(filePath, content, "utf8");
  console.log(`Written: ${filePath}`);
}
