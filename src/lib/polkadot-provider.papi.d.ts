import type { ChainId } from "@reactive-dot/core";
import type { WalletAccount } from "@reactive-dot/core/wallets.js";
import type { BlockInfo } from "polkadot-api";
import type { ReactNode } from "react";
export declare function PolkadotProvider({ children, }: {
    children: ReactNode;
    chainId?: ChainId;
}): import("react/jsx-runtime").JSX.Element;
export declare function useConnectionStatus({ chainId }: {
    chainId: ChainId;
}): {
    readonly blockInfo: BlockInfo | null;
    readonly status: "Connecting" | "Connected";
};
interface SelectedAccountContext {
    selectedAccount: WalletAccount | null;
    setSelectedAccount: (account: WalletAccount | null) => void;
}
declare const SelectedAccountContext: import("react").Context<SelectedAccountContext>;
export declare function SelectedAccountProvider({ children, }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const useSelectedAccount: () => SelectedAccountContext;
export {};
//# sourceMappingURL=polkadot-provider.papi.d.ts.map