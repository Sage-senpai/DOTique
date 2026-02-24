import { writeFileSync } from 'fs';

const pitch = `# DOTique — Investor & Ecosystem Pitch

## The Opportunity

The global fashion industry is a $2.5 trillion market. Digital fashion and metaverse wearables are projected to reach $50B by 2030. Yet no platform meaningfully bridges on-chain ownership, social expression, and fashion-native identity for Web3 users.

**DOTique fills that gap on Polkadot.**

---

## What We Built

DOTique is a Web3 SocialFi platform where fashion meets blockchain ownership:

- **DOTvatar** — A 3D, fully customisable avatar system. Build your digital identity, dress it in NFT wearables, and export it for use across games, metaverses, and social platforms.
- **NFT Fashion Studio** — A professional canvas-based design tool for minting fashion NFTs on Unique Network. Supports layers, undo stacks, PNG export, and on-chain metadata.
- **Marketplace** — A live NFT marketplace supporting listing, buying, secondary sales, on-chain creator royalties, and donation flows.
- **Social Feed** — A real-time fashion-native social network. Post outfits, like, comment, repost — backed by Supabase Realtime with optimistic UI updates.
- **NFT-Gated Communities** — Token-gated spaces for brands, creators, and collectors. Host style drops, challenges, and exclusive content.
- **DAO Governance** — On-chain voting weighted by staked DOT for platform direction and creator proposals.

---

## Why Polkadot

| Property | Benefit |
|---|---|
| Unique Network parachain | NFT minting with royalties, composability, nesting — purpose-built for fashion NFTs |
| Substrate wallets | Native Polkadot.js, SubWallet, Talisman — no MetaMask dependency |
| Smoldot light client | Trustless in-browser RPC — no centralised node required |
| Cross-chain XCM | DOTvatars and wearables can move across parachains |
| Low fees | Fashion-accessible transaction costs vs. Ethereum mainnet |

---

## Traction & Milestones

- Full-stack prototype: social feed, NFT studio, DOTvatar, marketplace, communities, messaging
- Polkadot SDK: smoldot light client + extension-dapp + Unique Network REST SDK integrated
- IPFS pipeline: Pinata + Crust Network for decentralised asset persistence
- Real-time backend: Supabase Realtime with subscription recovery and optimistic updates
- Enterprise design system: DOTique token system (Pink #FFB6C1 · Green #228B22 · Navy #000080), dark + light mode, WCAG AA contrast

---

## Roadmap

### Q1 2026 — Production Launch
- Mainnet NFT minting on Unique Network
- Marketplace v1 with on-chain royalties
- DOTvatar cross-platform export (VRM / GLB)

### Q2 2026 — Growth
- Mobile app (React Native / Capacitor)
- AI-assisted fashion design prompts
- Ambassador programme + creator onboarding

### Q3 2026 — Ecosystem
- Cross-chain DOTvatar via XCM
- DAO governance live
- Polkadot Treasury ecosystem grant

### Q4 2026 — Scale
- Brand partnership integrations
- Procedural fashion generation
- Collaboration mode for artist teams

---

## Ask

We are seeking **ecosystem grant funding** and **strategic partnerships** with:

- Polkadot / Unique Network ecosystem teams
- Digital fashion brands and IP holders
- Metaverse platform integrators

Contact us via Polkadot ecosystem channels or open a GitHub Discussion.
`;

const contributing = `# Contributing to DOTique

Thank you for your interest in contributing. This guide covers everything you need to get started.

---

## Code of Conduct

Be respectful, constructive, and inclusive. We follow the Contributor Covenant code of conduct.

---

## How to Contribute

### 1. Fork and Clone

\`\`\`bash
git clone https://github.com/your-fork/DOTique.git
cd DOTique
pnpm install
\`\`\`

### 2. Create a Branch

Branch naming conventions:

- \`feat/\` — new features
- \`fix/\` — bug fixes
- \`chore/\` — tooling, deps, config
- \`docs/\` — documentation only

### 3. Coding Standards

- TypeScript strict mode — no \`any\` without a justification comment
- Use design tokens from \`src/styles/App.scss\` — no raw hex values in components
- Use \`useToast()\` for user-facing notifications — never \`alert()\` or bare \`console.log\` in UI code
- New screens must use skeleton loaders while data fetches
- All blockchain interactions go through \`WalletContext\` or \`polkadotService\`
- NFT minting must flow: \`useMintNFT\` → \`transactionQueueService\` → \`uniqueNetworkService\`
- Never emit fake txHash values in production paths — use \`console.warn\` for dev stubs only

### 4. Verify Before Opening a PR

\`\`\`bash
pnpm typecheck   # zero errors required
pnpm lint        # zero errors required
pnpm build       # clean build required
\`\`\`

### 5. Commit Style

Follow Conventional Commits:

\`\`\`
feat(nft): add royalty split UI to mint modal
fix(feed): prevent duplicate realtime events on reconnect
chore(deps): update @unique-nft/sdk to 0.8
docs(readme): add Unique Network env var section
\`\`\`

### 6. Pull Request

- Target the \`main\` branch
- One feature / fix per PR
- Fill out the PR template and link related issues

---

## Project Structure Quick Reference

| Path | Purpose |
|---|---|
| \`src/services/\` | Pure async logic — no React hooks |
| \`src/hooks/\` | React hooks wrapping services |
| \`src/stores/\` | Zustand global state slices |
| \`src/screens/\` | One component per route |
| \`src/components/\` | Reusable UI — no direct Supabase/chain calls |
| \`src/styles/App.scss\` | All design tokens defined here |

---

## Design Tokens

Always use CSS custom properties:

\`\`\`scss
/* Correct */
color: var(--dt-text-primary);
background: var(--dt-color-pink-300);

/* Wrong */
color: white;
background: #ffb6c1;
\`\`\`

---

## Reporting Issues

Use GitHub Issues with:

- A clear title
- Steps to reproduce
- Expected vs. actual behaviour
- Browser / wallet / network details if relevant

---

## Questions and Ideas

Open a GitHub Discussion for questions, ideas, and feature proposals.
`;

writeFileSync('C:/Users/USER/DOTIQUE-2.0/PITCH.md', pitch);
writeFileSync('C:/Users/USER/DOTIQUE-2.0/CONTRIBUTING.md', contributing);
console.log('PITCH.md and CONTRIBUTING.md written.');
