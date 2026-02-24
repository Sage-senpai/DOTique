# Contributing to DOTique

Thank you for your interest in contributing. This guide covers everything you need to get started.

---

## Code of Conduct

Be respectful, constructive, and inclusive. We follow the Contributor Covenant code of conduct.

---

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/your-fork/DOTique.git
cd DOTique
pnpm install
```

### 2. Create a Branch

Branch naming conventions:

- `feat/` — new features
- `fix/` — bug fixes
- `chore/` — tooling, deps, config
- `docs/` — documentation only

### 3. Coding Standards

- TypeScript strict mode — no `any` without a justification comment
- Use design tokens from `src/styles/App.scss` — no raw hex values in components
- Use `useToast()` for user-facing notifications — never `alert()` or bare `console.log` in UI code
- New screens must use skeleton loaders while data fetches
- All blockchain interactions go through `WalletContext` or `polkadotService`
- NFT minting must flow: `useMintNFT` → `transactionQueueService` → `uniqueNetworkService`
- Never emit fake txHash values in production paths — use `console.warn` for dev stubs only

### 4. Verify Before Opening a PR

```bash
pnpm typecheck   # zero errors required
pnpm lint        # zero errors required
pnpm build       # clean build required
```

### 5. Commit Style

Follow Conventional Commits:

```
feat(nft): add royalty split UI to mint modal
fix(feed): prevent duplicate realtime events on reconnect
chore(deps): update @unique-nft/sdk to 0.8
docs(readme): add Unique Network env var section
```

### 6. Pull Request

- Target the `main` branch
- One feature / fix per PR
- Fill out the PR template and link related issues

---

## Project Structure Quick Reference

| Path | Purpose |
|---|---|
| `src/services/` | Pure async logic — no React hooks |
| `src/hooks/` | React hooks wrapping services |
| `src/stores/` | Zustand global state slices |
| `src/screens/` | One component per route |
| `src/components/` | Reusable UI — no direct Supabase/chain calls |
| `src/styles/App.scss` | All design tokens defined here |

---

## Design Tokens

Always use CSS custom properties:

```scss
/* Correct */
color: var(--dt-text-primary);
background: var(--dt-color-pink-300);

/* Wrong */
color: white;
background: #ffb6c1;
```

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
