// src/contexts/WalletContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  
} from "react";
import type { ReactNode } from "react";

interface WalletAccount {
  address: string;
  name?: string;
  source: string;
}

interface WalletContextType {
  accounts: WalletAccount[];
  selectedAccount: WalletAccount | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balance: string | null;
  connectWallet: (walletType: string) => Promise<void>;
  disconnectWallet: () => void;
  selectAccount: (address: string) => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  // Check for saved wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('connected-wallet');
    const savedAccount = localStorage.getItem('selected-account');
    
    if (savedWallet && savedAccount) {
      // Auto-reconnect (you can implement this with actual wallet connection)
      console.log('Auto-reconnecting to:', savedWallet);
    }
  }, []);

  // Connect wallet
  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    setError(null);

    try {
      // Mock wallet connection - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockAccounts: WalletAccount[] = [
        {
          address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          name: 'Main Wallet',
          source: walletType,
        },
        {
          address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          name: 'Trading Wallet',
          source: walletType,
        },
      ];

      setAccounts(mockAccounts);
      setSelectedAccount(mockAccounts[0]);
      setIsConnected(true);

      // Save to localStorage
      localStorage.setItem('connected-wallet', walletType);
      localStorage.setItem('selected-account', mockAccounts[0].address);

      // Fetch balance
      await refreshBalance();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMsg);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccounts([]);
    setSelectedAccount(null);
    setIsConnected(false);
    setBalance(null);
    setError(null);
    
    localStorage.removeItem('connected-wallet');
    localStorage.removeItem('selected-account');
  };

  // Select account
  const selectAccount = (address: string) => {
    const account = accounts.find((acc) => acc.address === address);
    if (account) {
      setSelectedAccount(account);
      localStorage.setItem('selected-account', address);
      refreshBalance();
    }
  };

  // Refresh balance
  const refreshBalance = async () => {
    if (!selectedAccount) return;

    try {
      // Mock balance fetch - replace with actual Polkadot API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockBalance = (Math.random() * 100).toFixed(4);
      setBalance(mockBalance);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  const value: WalletContextType = {
    accounts,
    selectedAccount,
    isConnected,
    isConnecting,
    error,
    balance,
    connectWallet,
    disconnectWallet,
    selectAccount,
    refreshBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
