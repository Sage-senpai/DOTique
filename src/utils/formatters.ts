// src/utils/formatters.ts
/**
 * ✨ Formatters — text, currency, and blockchain
 */

export function truncateAddress(addr: string, start = 6, end = 6): string {
  if (!addr) return "";
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatCurrency(amount: number, symbol = "$"): string {
  return `${symbol}${formatNumber(amount, 2)}`;
}

export function formatTxHash(hash: string): string {
  return truncateAddress(hash, 6, 6);
}
export function formatBlockNumber(block: number): string {
  return block.toLocaleString();
}