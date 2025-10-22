// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { DotApiContext } from "./hooks/useDotApi";
import Router from "./router/router";
import ConnectionStatus from "./components/ConnectionStatus";
import { createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec } from "polkadot-api/chains/polkadot";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import SmWorker from "polkadot-api/smoldot/worker?worker";
// @ts-ignore - descriptor exports not properly typed
import { dot } from "../descriptors";

import "./styles/App.scss";

export default function App() {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [dotApi, setDotApi] = useState<any>(null);

  useEffect(() => {
    let smoldot: any;
    const worker = new SmWorker();

    const init = async () => {
      try {
        setIsConnecting(true);
        console.log("🔄 Initializing Smoldot Polkadot client...");

        const sm = startFromWorker(worker);
        smoldot = sm;

        const chain = await sm.addChain({ chainSpec });
        const client = createClient(getSmProvider(chain));
        const api = client.getTypedApi(dot);
        setDotApi(api);
        setIsConnected(true);

        console.log("✅ Polkadot API ready:", api);

        // ✅ Use Smoldot's JSON-RPC directly
        try {
          const chainName = await chain.sendJsonRpc("system_chain");
          const runtimeVersion = await chain.sendJsonRpc("system_version");
          console.log(`🪐 Connected to chain: ${chainName} (runtime v${runtimeVersion})`);
        } catch (verifyErr) {
          console.warn("⚠️ On-chain verification failed:", verifyErr);
        }
      } catch (err) {
        console.error("❌ Smoldot init failed:", err);
        setIsConnected(false);
      } finally {
        setIsConnecting(false);
      }
    };

    init();

    const handleOnline = () => {
      console.log("🌐 Reconnected — restarting Smoldot");
      init();
    };
    const handleOffline = () => {
      console.warn("📴 Offline mode");
      setIsConnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (smoldot?.terminate) smoldot.terminate();
    };
  }, []);

  if (isConnecting || !isConnected) {
    return (
      <ConnectionStatus
        isConnecting={isConnecting}
        isConnected={isConnected}
      />
    );
  }

  return (
    <DotApiContext.Provider value={dotApi}>
      <AuthProvider>
        <BrowserRouter>
          <div className="safe-area">
            <Router />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </DotApiContext.Provider>
  );
}