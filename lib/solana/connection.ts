import { clusterApiUrl, Connection } from "@solana/web3.js";

export const SOLANA_CLUSTER = "devnet" as const;

export function getRpcUrl(): string {
  return process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(SOLANA_CLUSTER);
}

export function getConnection(): Connection {
  return new Connection(getRpcUrl(), "confirmed");
}

export function explorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_CLUSTER}`;
}

export function explorerAddressUrl(address: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=${SOLANA_CLUSTER}`;
}
