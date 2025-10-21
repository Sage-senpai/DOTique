import { type IdentitySearchResult } from "@/lib/types.dot-ui";
import { config } from "@/lib/reactive-dot.config";
export declare function useIdentitySearch(displayName: string | null | undefined, identityChain?: keyof typeof config.chains): import("@tanstack/react-query").UseQueryResult<IdentitySearchResult[], Error>;
//# sourceMappingURL=use-search-identity.papi.d.ts.map