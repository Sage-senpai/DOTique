"use client";
import { config } from "@/lib/reactive-dot.config";
import { ClientConnectionStatus, } from "@/lib/types.dot-ui";
import { useQuery } from "@tanstack/react-query";
import { useConnectionStatus } from "../src/lib/polkadot-provider.papi";
import { useClient } from "@reactive-dot/react";
export function hasIdentityPallet(api) {
    const a = api;
    return (!!a &&
        typeof a === "object" &&
        !!a.query &&
        !!a.query.Identity &&
        !!a.query.Identity.IdentityOf &&
        typeof a.query.Identity.IdentityOf.getValue === "function");
}
export function useIdentityOf({ address, chainId = "paseoPeople", }) {
    const { status } = useConnectionStatus({ chainId });
    const client = useClient({ chainId });
    const isConnected = status === ClientConnectionStatus.Connected;
    const isEnabled = isConnected && !!client && !!address;
    return useQuery({
        queryKey: ["papi-identity-of", chainId, address],
        queryFn: async () => {
            const typedApiUnknown = client.getTypedApi(config.chains[chainId].descriptor);
            if (!hasIdentityPallet(typedApiUnknown))
                return null;
            const peopleApi = typedApiUnknown;
            try {
                const raw = (await peopleApi.query.Identity.IdentityOf.getValue(address));
                if (!raw)
                    return null;
                const info = raw.info;
                const judgements = raw.judgements;
                const parseIdentityData = (d) => {
                    if (!d)
                        return undefined;
                    if (typeof d.value === "number")
                        return d.value;
                    if (typeof d.value?.asText === "function")
                        return d.value.asText();
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
                            const type = judgement?.type;
                            return type === "Reasonable" || type === "KnownGood";
                        })
                        : false,
                };
            }
            catch (e) {
                console.error("useIdentityOf (papi) failed", e);
                return null;
            }
        },
        enabled: isEnabled,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
