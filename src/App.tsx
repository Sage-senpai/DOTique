// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router/router";
import { ApiPromise, WsProvider } from "@polkadot/api";
import ConnectionStatus from "../src/components/ConnectionStatus";
import "./styles/App.scss";

// ✅ Main + fallback endpoints
const POLKADOT_NODES = [
  "wss://polkadot-rpc.dwellir.com",
  "wss://1rpc.io/dot",
  "wss://rpc.polkadot.io",
  "wss://polkadot.api.onfinality.io/public-ws",
  "wss://polkadot-rpc.publicnode.com",
];

export default function App() {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState<string | null>(null);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);

  // ⚡ Connect to multiple nodes in parallel, resolve the fastest
  const connectFast = async (endpoints: string[]) => {
    const attempts = endpoints.map(async (endpoint) => {
      try {
        const provider = new WsProvider(endpoint, 2000); // ⏱ 2s timeout
        const apiInstance = await ApiPromise.create({ provider });
        await apiInstance.isReady;
        return { api: apiInstance, endpoint };
      } catch {
        return null;
      }
    });

    const result = await Promise.any(attempts);
    if (!result) throw new Error("🚫 All Polkadot endpoints failed.");
    return result;
  };

  const connectToNetwork = async () => {
    try {
      setIsConnecting(true);
      setIsConnected(false);

      // 💾 Try last successful endpoint first
      const last = localStorage.getItem("lastEndpoint");
      const endpoints = last
        ? [last, ...POLKADOT_NODES.filter((e) => e !== last)]
        : POLKADOT_NODES;

      console.log("🌐 Trying endpoints:", endpoints);

      const { api, endpoint } = await connectFast(endpoints);

      setApi(api);
      setCurrentEndpoint(endpoint);
      localStorage.setItem("lastEndpoint", endpoint);

      console.log(`✅ Connected to Polkadot via ${endpoint}`);
      setIsConnected(true);
      setIsConnecting(false);

      // 🔁 Auto-retry on disconnect
      api.on("disconnected", () => {
        console.warn(`⚠️ Lost connection to ${endpoint}`);
        setIsConnected(false);
        retryConnection();
      });
    } catch (err) {
      console.error("❌ Connection failed:", err);
      setIsConnecting(false);
      setIsConnected(false);
      retryConnection();
    }
  };

  const retryConnection = async () => {
    if (retryTimeout.current) clearTimeout(retryTimeout.current);

    retryTimeout.current = setTimeout(() => {
      console.log("🔁 Retrying connection...");
      connectToNetwork();
    }, 3000);
  };

  useEffect(() => {
    connectToNetwork();

    return () => {
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, []);

  // 🛰️ Show loading or offline screen until connection stabilizes
  if (!isConnected || isConnecting) {
    return (
      <ConnectionStatus
        isConnected={isConnected}
        isConnecting={isConnecting}
        endpoint={currentEndpoint}
      />
    );
  }

  // ✅ Main app render
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
