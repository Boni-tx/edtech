import { NextResponse } from "next/server";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createClient } from "@/lib/supabase/server";
import { getConnection } from "@/lib/solana/connection";
import { getVaultKeypair } from "@/lib/solana/vault";

/**
 * Libera o pagamento retido em escrow pro professor. Em produção isso seria
 * disparado pelo evento "aula concluída" (ex: fim da videochamada); aqui, pro
 * demo do hackathon, é disparado pelo botão "Confirmar aula concluída".
 */
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { tutorAddress, amountSol } = await request.json();

  let tutorPubkey: PublicKey;
  try {
    tutorPubkey = new PublicKey(tutorAddress);
  } catch {
    return NextResponse.json({ error: "Endereço da carteira do professor inválido." }, { status: 400 });
  }

  const amount = Number(amountSol);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
  }

  try {
    const connection = getConnection();
    const vault = getVaultKeypair();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: vault.publicKey,
        toPubkey: tutorPubkey,
        lamports: Math.round(amount * LAMPORTS_PER_SOL),
      })
    );

    const signature = await connection.sendTransaction(transaction, [vault]);
    await connection.confirmTransaction(signature, "confirmed");

    return NextResponse.json({ signature });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha ao liberar o pagamento.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
