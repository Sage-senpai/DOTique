"use client";

import { config } from "@/lib/reactive-dot.config";
import {
  ClientConnectionStatus,
  type PolkadotIdentity,
} from "@/lib/types.dot-ui";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useConnectionStatus } from "../src/lib/polkadot-provider.papi";
import { useClient } from "@reactive-dot/react";
import type { IdentityInfo } from "@polkadot/types/interfaces/identity";

export function hasIdentityPallet<A>(api: A): api is A & {
  query: {
    Identity: {
      IdentityOf: {
        getValue: (address: string) => Promise<{ info: IdentityInfo; judgements: any[] }>;
        getEntries: () => Promise<any>;
      };
    };
  };
} {
  const a = api as {
    query?: {
      Identity?: {
        IdentityOf?: { getValue?: (address: string) => Promise<never> };
      };
    };
  } | null;
  return (
    !!a &&
    typeof a === "object" &&
    !!a.query &&
    !!a.query.Identity &&
    !!a.query.Identity.IdentityOf &&
    typeof a.query.Identity.IdentityOf.getValue === "function"
  );
}

export function useIdentityOf({
  address,
  chainId = "paseoPeople",
}: {
  address: string;
  chainId?: keyof typeof config.chains;
}): UseQueryResult<PolkadotIdentity | null, Error> {
  const { status } = useConnectionStatus({ chainId });
  const client = useClient({ chainId });
  const isConnected = status === ClientConnectionStatus.Connected;
  const isEnabled = isConnected && !!client && !!address;

  return useQuery({
    queryKey: ["papi-identity-of", chainId, address],
    queryFn: async (): Promise<PolkadotIdentity | null> => {
      const typedApiUnknown = client!.getTypedApi(
        config.chains[chainId].descriptor
      );
      if (!hasIdentityPallet(typedApiUnknown)) return null;
      const peopleApi = typedApiUnknown;

      try {
        const raw = (await peopleApi.query.Identity.IdentityOf.getValue(
          address
        )) as unknown as { info: IdentityInfo; judgements: any[] };

        if (!raw) return null;

        const info = raw.info;
        const judgements = raw.judgements;

        const parseIdentityData = (d: any): string | number | undefined => {
          if (!d) return undefined;
          if (typeof d.value === "number") return d.value;
          if (typeof d.value?.asText === "function") return d.value.asText();
          return undefined;
        };

        return {
          display: parseIdentityData(info?.display),
          legal: parseIdentityData(info?.legal),
          email: parseIdentityData(info?.email),
          twitter: parseIdentityData(info?.twitter),
          image: parseIdentityData(info?.image),
          verified: Array.isArray(judgements)
            ? judgements.some(([, judgement]) => {
                const type = (judgement as { type?: string } | undefined)?.type;
                return type === "Reasonable" || type === "KnownGood";
              })
            : false,
        };
      } catch (e) {
        console.error("useIdentityOf (papi) failed", e);
        return null;
      }
    },
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  }) as UseQueryResult<PolkadotIdentity | null, Error>;
}
