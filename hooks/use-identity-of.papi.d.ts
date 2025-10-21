import { config } from "@/lib/reactive-dot.config";
import { type PolkadotIdentity } from "@/lib/types.dot-ui";
import { type UseQueryResult } from "@tanstack/react-query";
import type { IdentityInfo } from "@polkadot/types/interfaces/identity";
export declare function hasIdentityPallet<A>(api: A): api is A & {
    query: {
        Identity: {
            IdentityOf: {
                getValue: (address: string) => Promise<{
                    info: IdentityInfo;
                    judgements: any[];
                }>;
                getEntries: () => Promise<any>;
            };
        };
    };
};
export declare function useIdentityOf({ address, chainId, }: {
    address: string;
    chainId?: keyof typeof config.chains;
}): UseQueryResult<PolkadotIdentity | null, Error>;
//# sourceMappingURL=use-identity-of.papi.d.ts.map