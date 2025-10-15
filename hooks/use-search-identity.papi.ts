"use client";

import { useQuery } from "@tanstack/react-query";
import { hasIdentityPallet } from "@/hooks/use-identity-of.papi";
import {
  extractText,
  hasPositiveIdentityJudgement,
} from "@/lib/utils.dot-ui";
import {
  ClientConnectionStatus,
  type IdentitySearchResult,
} from "@/lib/types.dot-ui";
import { config } from "@/lib/reactive-dot.config";
import { useConnectionStatus } from "../lib/polkadot-provider.papi";
import { useClient } from "@reactive-dot/react";

export function useIdentitySearch(
  displayName: string | null | undefined,
  identityChain: keyof typeof config.chains = "paseoPeople"
) {
  const { status } = useConnectionStatus({ chainId: identityChain });
  const client = useClient({ chainId: identityChain });
  //TODO use the status directly
  const isLoading = status === ClientConnectionStatus.Connecting;
  const isConnected = status === ClientConnectionStatus.Connected;
  const peopleApi = client?.getTypedApi(
    config.chains[identityChain].descriptor
  );

  return useQuery({
    queryKey: ["identity-search", displayName, identityChain],
    queryFn: async (): Promise<IdentitySearchResult[]> => {
      if (
        !hasIdentityPallet(peopleApi) ||
        !displayName ||
        displayName.length < 3 ||
        isLoading ||
        !isConnected
      ) {
        return [];
      }

      try {
        // Get all identity entries
        const entries = await peopleApi.query.Identity.IdentityOf.getEntries();

        const MAX_RESULTS = 10;
        const matches: IdentitySearchResult[] = [];

        for (const { keyArgs, value } of entries) {
          if (!value || !value.info?.display?.value) continue;

          const display = extractText(value.info.display.value);

          if (
            display &&
            display.toLowerCase().includes(displayName.toLowerCase())
          ) {
            const hasPositiveJudgement = hasPositiveIdentityJudgement(
              value.judgements
            );

            // Only include verified identities in search results
            // Remove this if block if we want to show all identities
            if (hasPositiveJudgement) {
              matches.push({
                address: keyArgs[0] as string,
                identity: {
                  display,
                  email: extractText(value.info?.email?.value),
                  legal: extractText(value.info?.legal?.value),
                  matrix: extractText(value.info?.matrix?.value),
                  twitter: extractText(value.info?.twitter?.value),
                  web: extractText(value.info?.web?.value),
                  image: extractText(value.info?.image?.value),
                  verified: true,
                },
              });

              if (matches.length >= MAX_RESULTS) {
                break;
              }
            }
          }
        }

        return matches;
      } catch (error) {
        console.error("Identity search failed:", error);
        throw error instanceof Error
          ? error
          : new Error("Identity search failed");
      }
    },
    enabled:
      hasIdentityPallet(peopleApi) &&
      !!displayName &&
      displayName.length >= 3 &&
      isConnected,
    staleTime: 5 * 60 * 1000, // 5 minutes - identities don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes - keep cached longer for search
  });
}
