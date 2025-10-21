import type { TokenInfo, TokenMetadata } from "@/lib/types.dot-ui";
export declare const NATIVE_TOKEN_KEY = -1;
export declare const NATIVE_TOKEN_ID = "substrate-native";
export declare const DEFAULT_TOKEN_DECIMALS = 12;
export declare const DEFAULT_CALLER = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
export declare function getTokenDecimals(token: TokenInfo | null | undefined): number;
export declare const extractText: (value: unknown) => string | undefined;
export interface ValidationResult {
    isValid: boolean;
    type: "ss58" | "eth" | "unknown";
    error?: string;
    normalizedAddress?: string;
}
export declare function truncateAddress(address: string, length?: number | boolean): string;
export declare function shortenName(name: string, length?: number | boolean): string;
/**
 * Check if an identity has positive judgements to determine a verified identity
 * @param judgements Array of judgements from on chain query
 * @returns {boolean} indicating if identity is verified
 */
export declare function hasPositiveIdentityJudgement(judgements: [number, unknown][] | null | undefined): boolean;
export declare const formatBalance: ({ value, decimals, unit, nDecimals, }: {
    value: bigint | null | undefined;
    decimals?: number;
    unit?: string;
    nDecimals?: number;
    padToDecimals?: boolean;
    decimalSeparator?: string;
}) => string;
export declare function formatPlanck(value: bigint | null | undefined, decimals?: number, options?: {
    fractionDigits?: number;
    thousandsSeparator?: string;
    decimalSeparator?: string;
    trimTrailingZeros?: boolean;
    round?: boolean;
}): string;
export declare function camelToKebabCase(str: string): string;
export declare function snakeToKebabCase(str: string): string;
/**
 * Generate token ID in the format: chainId:substrate-assets:assetId
 * @param chainId - Chain identifier (can be camelCase or snake_case, will be converted to kebab-case)
 * @param assetId - Asset identifier
 * @returns Formatted token ID
 */
export declare function generateTokenId(chainId: string, assetId: string): string;
export declare function chainIdToKebabCase(chainId: string): string;
/**
 * Parse token ID to extract chainId and assetId
 * @param tokenId - Token ID in format: chainId:substrate-assets:assetId
 * @returns Object with chainId and assetId, or null if invalid format
 */
export declare function parseTokenId(tokenId: string): {
    chainId: string;
    assetId: string;
} | null;
/**
 * Format token balance with proper handling of null values
 * @param balance - Token balance in bigint format
 * @param decimals - Number of decimals for the token
 * @param precision - Number of decimal places to display (defaults to 2)
 * @returns Formatted balance string or "0" if balance is null
 */
export declare function formatTokenBalance(balance: bigint | null, decimals?: number, precision?: number, thousandsSeparator?: string, decimalSeparator?: string): string;
/**
 * Convert token balance to USD price using a conversion rate
 * @param balance - Token balance in bigint format
 * @param decimals - Number of decimals for the token
 * @param conversionRate - USD conversion rate (default: 1 for stablecoins)
 * @returns Formatted USD price string or "0.00" if balance is null
 */
export declare function formatTokenPrice(balance: bigint | null, decimals?: number, conversionRate?: number): string;
/**
 * Create default chain tokens from asset metadata
 * This ensures we always have token data even when chaindata is incomplete
 */
export declare function createDefaultChainTokens(assets: TokenMetadata[], chainId: string, includeNative?: boolean): TokenInfo[];
/**
 * Merge default tokens with chaindata tokens, preferring chaindata when available
 * Also includes native tokens from chaindata that aren't in defaultTokens
 */
export declare function mergeWithChaindataTokens(defaultTokens: TokenInfo[], chaindataTokens: TokenInfo[]): TokenInfo[];
/**
 * Normalize various numeric-like representations into bigint
 * Accepts bigint, number, objects exposing toBigInt(), or toString() returning a base-10 string
 */
export declare function parseBalanceLike(value: unknown): bigint | null;
/**
 * Helper function to get actual balance for a token
 * @param balances - Record of balances by assetId
 * @param connectedAccount - Connected account object
 * @param assetId - Asset ID to get balance for (number or "substrate-native")
 * @returns Token balance or null if not available
 */
export declare function getTokenBalance(balances: Record<number, bigint | null> | undefined, connectedAccount: {
    address?: string;
} | null | undefined, assetId: number | string): bigint | null;
export declare function safeStringify(value: unknown): string;
//# sourceMappingURL=utils.dot-ui.d.ts.map