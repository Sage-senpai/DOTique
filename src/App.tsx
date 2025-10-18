// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router/router";
import ConnectionStatus from "./components/ConnectionStatus";
import { createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec } from "polkadot-api/chains/polkadot";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import SmWorker from "polkadot-api/smoldot/worker?worker";
import { dot } from "@polkadot-api/descriptors";
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
        const sm = startFromWorker(worker);
        smoldot = sm;

        const chain = await sm.addChain({ chainSpec });
        const client = createClient(getSmProvider(chain));
        const api = client.getTypedApi(dot);

        setDotApi(api);
        setIsConnected(true);
      } catch (err) {
        console.error("❌ Smoldot init failed:", err);
        setIsConnected(false);
      } finally {
        setIsConnecting(false);
      }
    };

    init();

    // 🛰 auto-detect offline/online changes
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
      if (smoldot) smoldot.terminate?.();
    };
  }, []);

  // 🛰 Show loader or offline screen
  if (isConnecting || !isConnected) {
    return (
      <ConnectionStatus
        isConnecting={isConnecting}
        isConnected={isConnected}
      />
    );
  }

  // ✅ Main app content
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="safe-area">
          <Router />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
