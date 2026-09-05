// Gera a keypair da carteira "cofre" da plataforma e tenta financiá-la com
// SOL de teste na devnet. Rodar com: node scripts/generate-vault-keypair.mjs
import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const keypair = Keypair.generate();
const secretKeyJson = JSON.stringify(Array.from(keypair.secretKey));

console.log("\n=== Carteira cofre gerada ===");
console.log("Endereço público (pode ser exposto):", keypair.publicKey.toBase58());
console.log("\nAdicione ao .env.local e às env vars da Vercel:\n");
console.log(`SOLANA_VAULT_SECRET_KEY=${secretKeyJson}`);
console.log(`NEXT_PUBLIC_SOLANA_VAULT_ADDRESS=${keypair.publicKey.toBase58()}`);

try {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  console.log("\nSolicitando airdrop de 1 SOL de teste na devnet...");
  const signature = await connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature, "confirmed");
  console.log("Airdrop confirmado:", signature);
} catch (err) {
  console.warn(
    "\nNão foi possível pedir airdrop automático (comum quando o faucet está sob rate limit)."
  );
  console.warn(
    `Financie manualmente em https://faucet.solana.com colando o endereço acima.`
  );
  console.warn("Detalhe do erro:", err?.message ?? err);
}
