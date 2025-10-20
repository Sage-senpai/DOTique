// src/providers/PolkadotProvider.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { polkadotService } from "../services/polkadotService"; 

type Props = { children: ReactNode };

export function PolkadotProvider({ children }: Props) {
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    async function initPolkadot() {
      try {
        await polkadotService.connect(import.meta.env.VITE_POLKADOT_RPC_URL);
        setApiReady(true);
      } catch (error) {
        console.error("⚠️ Polkadot connection failed:", error);
      }
    }
    initPolkadot();
  }, []);

  if (!apiReady) {
    // ⬇️ Safe fallback (prevents blank screen)
    return <div style={{ flex: 1, height: "100vh", backgroundColor: "#000080" }} />;
  }

  return <>{children}</>;
}
