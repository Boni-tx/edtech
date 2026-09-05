"use client";

import { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { explorerTxUrl } from "@/lib/solana/connection";

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_SOLANA_VAULT_ADDRESS ?? "";

type Step = "idle" | "depositing" | "held" | "releasing" | "released";

export default function EscrowDemo() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amountSol, setAmountSol] = useState("0.01");
  const [tutorAddress, setTutorAddress] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [depositSignature, setDepositSignature] = useState<string | null>(null);
  const [releaseSignature, setReleaseSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vaultPubkey = useMemo(() => {
    try {
      return VAULT_ADDRESS ? new PublicKey(VAULT_ADDRESS) : null;
    } catch {
      return null;
    }
  }, []);

  async function handleDeposit() {
    setError(null);
    if (!publicKey) {
      setError("Conecte sua carteira primeiro.");
      return;
    }
    if (!vaultPubkey) {
      setError("Carteira cofre da plataforma não configurada (NEXT_PUBLIC_SOLANA_VAULT_ADDRESS).");
      return;
    }
    const amount = Number(amountSol);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Digite um valor válido em SOL.");
      return;
    }

    setStep("depositing");
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: vaultPubkey,
          lamports: Math.round(amount * LAMPORTS_PER_SOL),
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      setDepositSignature(signature);
      setStep("held");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar o pagamento.");
      setStep("idle");
    }
  }

  async function handleRelease() {
    setError(null);
    let tutorPubkey: string;
    try {
      tutorPubkey = new PublicKey(tutorAddress).toBase58();
    } catch {
      setError("Endereço da carteira do professor inválido.");
      return;
    }

    setStep("releasing");
    try {
      const res = await fetch("/api/escrow/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorAddress: tutorPubkey, amountSol }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao liberar o pagamento.");
      setReleaseSignature(data.signature);
      setStep("released");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao liberar o pagamento.");
      setStep("held");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-navy-900/8 bg-white p-8 shadow-card">
      <div className="mb-5 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-confirm-600" />
        <h2 className="text-lg font-bold text-navy-900">Escrow on-chain (Solana devnet)</h2>
      </div>
      <p className="mb-6 text-sm text-navy-500">
        Demonstração real: o pagamento da aula fica retido numa carteira cofre na devnet da
        Solana até a aula ser confirmada como concluída — cada passo gera uma transação real,
        verificável no Explorer.
      </p>

      <div className="mb-5">
        <WalletMultiButton style={{ width: "100%", justifyContent: "center" }} />
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}

      {step !== "held" && step !== "releasing" && step !== "released" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Valor da aula (SOL, devnet)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.001"
              value={amountSol}
              onChange={(e) => setAmountSol(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            size="lg"
            disabled={!publicKey || step === "depositing"}
            onClick={handleDeposit}
          >
            {step === "depositing" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Confirmando na devnet...
              </>
            ) : (
              "Pagar e reter em escrow"
            )}
          </Button>
        </div>
      )}

      {(step === "held" || step === "releasing" || step === "released") && depositSignature && (
        <div className="space-y-4">
          <TxRow label="Depósito (aluno → cofre)" signature={depositSignature} />

          {step === "held" && (
            <>
              <div>
                <Label htmlFor="tutor">Endereço da carteira do professor (devnet)</Label>
                <Input
                  id="tutor"
                  placeholder="Cole o endereço público da carteira do professor"
                  value={tutorAddress}
                  onChange={(e) => setTutorAddress(e.target.value)}
                />
              </div>
              <Button className="w-full" size="lg" onClick={handleRelease}>
                Confirmar aula concluída e liberar pagamento
              </Button>
            </>
          )}

          {step === "releasing" && (
            <Button className="w-full" size="lg" disabled>
              <Loader2 className="h-4 w-4 animate-spin" /> Liberando pagamento...
            </Button>
          )}

          {step === "released" && releaseSignature && (
            <TxRow label="Liberação (cofre → professor)" signature={releaseSignature} />
          )}
        </div>
      )}
    </div>
  );
}

function TxRow({ label, signature }: { label: string; signature: string }) {
  return (
    <a
      href={explorerTxUrl(signature)}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-2 rounded-lg border border-confirm-500/20 bg-confirm-500/5 px-3.5 py-2.5 text-sm text-confirm-600 hover:bg-confirm-500/10"
    >
      <span className="font-medium">{label}</span>
      <span className="flex items-center gap-1 truncate text-xs">
        {signature.slice(0, 8)}...{signature.slice(-8)}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </span>
    </a>
  );
}
