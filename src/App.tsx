// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router/router";
import { ApiPromise, WsProvider } from "@polkadot/api";
import ConnectionStatus from "../src/components/ConnectionStatus"; // ✅ new screen
import "./styles/App.scss"; // Global styles

export default function App() {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      try {
        setIsConnecting(true);
        const provider = new WsProvider("wss://rpc.polkadot.io");
        const apiInstance = await ApiPromise.create({ provider });

        apiInstance.on("connected", () => {
          console.log("✅ Connected to Polkadot node");
          setIsConnected(true);
          setIsConnecting(false);
        });

        apiInstance.on("disconnected", () => {
          console.warn("⚠️ Disconnected from Polkadot node");
          setIsConnected(false);
          setIsConnecting(false);
        });

        setApi(apiInstance);
      } catch (err) {
        console.error("❌ Connection failed:", err);
        setIsConnecting(false);
        setIsConnected(false);
      }
    };

    connect();
  }, []);

  // 🔁 Show loading / offline screen until connection stabilizes
  if (!isConnected || isConnecting) {
    return <ConnectionStatus isConnected={isConnected} isConnecting={isConnecting} />;
  }

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
