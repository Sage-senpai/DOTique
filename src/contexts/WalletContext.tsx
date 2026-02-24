/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { polkadotService } from "../services/polkadotService";
import { saveItem, getItem, deleteItem } from "../utils/secureStore";

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
  networkName: string | null;
  isNetworkMismatch: boolean;
  connectWallet: (walletType: string) => Promise<void>;
  disconnectWallet: () => void;
  selectAccount: (address: string) => void;
  refreshBalance: () => Promise<void>;
}

interface WalletSession {
  walletType: string;
  selectedAddress: string;
  connectedAt: number;
}

const WALLET_SESSION_KEY = "wallet-session";
const WALLET_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DOT_DECIMALS = 10n;

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function formatPlanckToDot(planck: string): string {
  try {
    const value = BigInt(planck || "0");
    const divisor = 10n ** DOT_DECIMALS;
    const whole = value / divisor;
    const fraction = (value % divisor).toString().padStart(Number(DOT_DECIMALS), "0");
    const trimmedFraction = fraction.slice(0, 4).replace(/0+$/, "");
    return trimmedFraction ? `${whole}.${trimmedFraction}` : whole.toString();
  } catch {
    return "0";
  }
}

function mapInjectedAccount(account: any, walletType: string): WalletAccount {
  return {
    address: account.address,
    name: account.meta?.name || account.name || "Wallet Account",
    source: account.meta?.source || account.source || walletType,
  };
}

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [isNetworkMismatch, setIsNetworkMismatch] = useState(false);

  const refreshBalanceFor = useCallback(async (address: string) => {
    try {
      await polkadotService.connect(import.meta.env.VITE_POLKADOT_RPC_URL);
      const api = polkadotService.api;
      if (!api?.query?.system?.account) {
        setBalance(null);
        return;
      }

      const accountInfo = await api.query.system.account(address);
      const freePlanck = accountInfo?.data?.free?.toString?.() || "0";
      setBalance(formatPlanckToDot(freePlanck));

      if (api?.rpc?.system?.chain) {
        const chain = await api.rpc.system.chain();
        const currentNetwork = chain?.toString?.() || null;
        setNetworkName(currentNetwork);
        setIsNetworkMismatch(
          !!currentNetwork && currentNetwork.toLowerCase() !== "polkadot"
        );
      }
    } catch (err) {
      console.error("Failed to fetch wallet balance:", err);
      setBalance(null);
    }
  }, []);

  const persistSession = useCallback(
    async (walletType: string, accountAddress: string) => {
      const payload: WalletSession = {
        walletType,
        selectedAddress: accountAddress,
        connectedAt: Date.now(),
      };
      await saveItem(WALLET_SESSION_KEY, JSON.stringify(payload), true);
    },
    []
  );

  const connectWalletInternal = useCallback(
    async (walletType: string, preferredAddress?: string, silent = false) => {
      setIsConnecting(true);
      if (!silent) setError(null);

      try {
        const injectedAccounts = await polkadotService.enableExtensions();
        if (!injectedAccounts?.length) {
          throw new Error(
            "No Substrate wallets detected. Install Polkadot.js, Talisman, or SubWallet."
          );
        }

        const mappedAccounts = injectedAccounts.map((acc: any) =>
          mapInjectedAccount(acc, walletType)
        );
        setAccounts(mappedAccounts);

        const account =
          mappedAccounts.find((acc) => acc.address === preferredAddress) ||
          mappedAccounts[0] ||
          null;
        setSelectedAccount(account);
        setIsConnected(!!account);

        if (account) {
          await persistSession(walletType, account.address);
          await refreshBalanceFor(account.address);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to connect wallet";
        setError(errorMsg);
        setIsConnected(false);
        setAccounts([]);
        setSelectedAccount(null);
      } finally {
        setIsConnecting(false);
      }
    },
    [persistSession, refreshBalanceFor]
  );

  useEffect(() => {
    let disposed = false;

    const restoreWalletSession = async () => {
      try {
        const raw = await getItem(WALLET_SESSION_KEY, true);
        if (!raw || disposed) return;

        const parsed = JSON.parse(raw) as WalletSession;
        const expired = Date.now() - parsed.connectedAt > WALLET_SESSION_TTL_MS;

        if (expired) {
          await deleteItem(WALLET_SESSION_KEY);
          return;
        }

        await connectWalletInternal(parsed.walletType, parsed.selectedAddress, true);
      } catch {
        await deleteItem(WALLET_SESSION_KEY);
      }
    };

    restoreWalletSession();

    return () => {
      disposed = true;
    };
  }, [connectWalletInternal]);

  const connectWallet = useCallback(
    async (walletType: string) => {
      await connectWalletInternal(walletType);
    },
    [connectWalletInternal]
  );

  const disconnectWallet = useCallback(() => {
    setAccounts([]);
    setSelectedAccount(null);
    setIsConnected(false);
    setBalance(null);
    setError(null);
    setNetworkName(null);
    setIsNetworkMismatch(false);
    void deleteItem(WALLET_SESSION_KEY);
  }, []);

  const selectAccount = useCallback(
    (address: string) => {
      const account = accounts.find((acc) => acc.address === address);
      if (!account) return;

      setSelectedAccount(account);
      void persistSession(account.source, address);
      void refreshBalanceFor(address);
    },
    [accounts, persistSession, refreshBalanceFor]
  );

  const refreshBalance = useCallback(async () => {
    if (!selectedAccount) return;
    await refreshBalanceFor(selectedAccount.address);
  }, [refreshBalanceFor, selectedAccount]);

  const value: WalletContextType = {
    accounts,
    selectedAccount,
    isConnected,
    isConnecting,
    error,
    balance,
    networkName,
    isNetworkMismatch,
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
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};
