/* eslint-disable react-refresh/only-export-components */
"use client";

import { ClientConnectionStatus } from "@/lib/types.dot-ui";
import { config } from "@/lib/reactive-dot.config";
import type { ChainId } from "@reactive-dot/core";
import type { WalletAccount } from "@reactive-dot/core/wallets.js";
import {
  ReactiveDotProvider,
  useAccounts,
  useBlock,
} from "@reactive-dot/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { BlockInfo } from "polkadot-api";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteItem, getItem, saveItem } from "../utils/secureStore";

const queryClient = new QueryClient();

export function PolkadotProvider({
  children,
}: {
  children: ReactNode;
  chainId?: ChainId;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactiveDotProvider config={config}>
        <SelectedAccountProvider>{children}</SelectedAccountProvider>
      </ReactiveDotProvider>
    </QueryClientProvider>
  );
}

export function useConnectionStatus({ chainId }: { chainId: ChainId }) {
  const blockInfo = useBlock("best", { chainId }) as
    | BlockInfo
    | null
    | undefined;
  const status = blockInfo
    ? ClientConnectionStatus.Connected
    : ClientConnectionStatus.Connecting;

  return { blockInfo: blockInfo ?? null, status } as const;
}

// selectedaccount provider, reactive-dot does not provide this
interface SelectedAccountContext {
  selectedAccount: WalletAccount | null;
  setSelectedAccount: (account: WalletAccount | null) => void;
}

const SelectedAccountContext = createContext<SelectedAccountContext>({
  selectedAccount: null,
  setSelectedAccount: () => {},
});

const SELECTED_ACCOUNT_KEY = "polkadot:selected-account";

export function SelectedAccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAccount, setSelectedAccountState] =
    useState<WalletAccount | null>(null);

  const accounts = useAccounts({ defer: true });

  // Load selected account from secure storage on mount.
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const stored = await getItem(SELECTED_ACCOUNT_KEY);
        if (!stored || !mounted) return;

        setSelectedAccountState(
          accounts?.find((account) => account.address === stored) || null
        );
      } catch (error) {
        console.warn("Failed to restore selected account:", error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [accounts]);

  const setSelectedAccount = (account: WalletAccount | null) => {
    setSelectedAccountState(account);
    if (account) {
      saveItem(SELECTED_ACCOUNT_KEY, account.address).catch((error) => {
        console.warn("Failed to persist selected account:", error);
      });
    } else {
      deleteItem(SELECTED_ACCOUNT_KEY).catch((error) => {
        console.warn("Failed to clear selected account:", error);
      });
    }
  };

  return (
    <SelectedAccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </SelectedAccountContext.Provider>
  );
}

export const useSelectedAccount = () => {
  const context = useContext(SelectedAccountContext);
  if (!context) {
    throw new Error(
      "useSelectedAccount must be used within a SelectedAccountProvider"
    );
  }
  return context;
};
