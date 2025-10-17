// src/components/ConnectionStatus.tsx
import React from "react";

interface Props {
  isConnected: boolean;
  isConnecting: boolean;
}

const ConnectionStatus: React.FC<Props> = ({ isConnected, isConnecting }) => {
  if (isConnecting) {
    return (
      <div className="connection-screen">
        <div className="loader" />
        <p>Connecting to the Polkadot network...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="connection-screen">
        <div className="offline-icon">📡</div>
        <p>No internet or network connection.</p>
        <p className="hint">Please check your connection to proceed.</p>
      </div>
    );
  }

  return null; // when connected, show nothing
};

export default ConnectionStatus;
