import { Keypair } from "@solana/web3.js";

/**
 * Carteira "cofre" da plataforma — só existe no servidor. Recebe os depósitos
 * dos alunos (assinados pela própria carteira deles) e é quem assina a
 * liberação do pagamento pro professor quando a aula é confirmada.
 * NUNCA importar este arquivo de um Client Component.
 */
export function getVaultKeypair(): Keypair {
  const raw = process.env.SOLANA_VAULT_SECRET_KEY;
  if (!raw) {
    throw new Error(
      "SOLANA_VAULT_SECRET_KEY não configurada. Gere uma com scripts/generate-vault-keypair.mjs."
    );
  }
  const secretKey = Uint8Array.from(JSON.parse(raw));
  return Keypair.fromSecretKey(secretKey);
}
