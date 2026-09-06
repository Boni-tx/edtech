"use client";

import { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingPicker from "@/components/app/RatingPicker";
import { explorerTxUrl } from "@/lib/solana/connection";
import { MOCK_TIME_SLOTS, type Professor } from "@/lib/mock/professors";
import { cn } from "@/lib/utils";

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_SOLANA_VAULT_ADDRESS ?? "";

type Step = "select" | "depositing" | "held" | "releasing" | "released" | "rated";

export default function BookingFlow({ professor }: { professor: Professor }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [depositSignature, setDepositSignature] = useState<string | null>(null);
  const [releaseSignature, setReleaseSignature] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vaultPubkey = useMemo(() => {
    try {
      return VAULT_ADDRESS ? new PublicKey(VAULT_ADDRESS) : null;
    } catch {
      return null;
    }
  }, []);

  const slotLabel = MOCK_TIME_SLOTS.find((s) => s.id === selectedSlot)?.label;

  async function handlePay() {
    setError(null);
    if (!publicKey) {
      setError("Conecte sua carteira primeiro.");
      return;
    }
    if (!vaultPubkey) {
      setError("Carteira cofre da plataforma não configurada.");
      return;
    }

    setStep("depositing");
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: vaultPubkey,
          lamports: Math.round(professor.priceSol * LAMPORTS_PER_SOL),
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      setDepositSignature(signature);
      setStep("held");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar o pagamento.");
      setStep("select");
    }
  }

  async function handleRelease() {
    setError(null);
    setStep("releasing");
    try {
      const res = await fetch("/api/escrow/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorAddress: professor.walletAddress, amountSol: professor.priceSol }),
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
    <div className="mt-6 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card">
      <h2 className="mb-1 text-sm font-bold text-navy-900">Agendar aula</h2>
      <p className="mb-4 text-xs text-navy-500">
        Pagamento protegido: fica retido em escrow (Solana devnet) até a aula ser confirmada.
      </p>

      {step === "select" && (
        <>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {MOCK_TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlot(slot.id)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                  selectedSlot === slot.id
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/12 text-navy-700 hover:border-navy-900/25"
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <WalletMultiButton style={{ width: "100%", justifyContent: "center" }} />
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button className="w-full" size="lg" disabled={!selectedSlot} onClick={handlePay}>
            Pagar {professor.priceSol} SOL e reservar horário
          </Button>
        </>
      )}

      {step === "depositing" && (
        <Button className="w-full" size="lg" disabled>
          <Loader2 className="h-4 w-4 animate-spin" /> Confirmando pagamento na devnet...
        </Button>
      )}

      {(step === "held" || step === "releasing" || step === "released" || step === "rated") &&
        depositSignature && (
          <div className="space-y-4">
            <div className="rounded-lg border border-confirm-500/20 bg-confirm-500/5 px-4 py-3 text-sm text-confirm-600">
              Aula com {professor.name} agendada para <strong>{slotLabel}</strong>. Pagamento
              retido em escrow.
            </div>
            <TxRow label="Depósito (você → cofre)" signature={depositSignature} />

            {step === "held" && (
              <>
                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <Button className="w-full" size="lg" onClick={handleRelease}>
                  Simular fim da aula e liberar pagamento
                </Button>
              </>
            )}

            {step === "releasing" && (
              <Button className="w-full" size="lg" disabled>
                <Loader2 className="h-4 w-4 animate-spin" /> Liberando pagamento...
              </Button>
            )}

            {(step === "released" || step === "rated") && releaseSignature && (
              <>
                <TxRow label="Liberação (cofre → professor)" signature={releaseSignature} />
                <div className="flex items-center gap-2 text-sm font-medium text-navy-900">
                  <CheckCircle2 className="h-4 w-4 text-confirm-600" />
                  Aula concluída!
                </div>
              </>
            )}

            {step === "released" && (
              <div className="rounded-xl border border-navy-900/8 p-4">
                <p className="mb-2 text-sm font-medium text-navy-900">Como foi a aula?</p>
                <RatingPicker
                  onSubmit={(value) => {
                    setRating(value);
                    setStep("rated");
                  }}
                />
              </div>
            )}

            {step === "rated" && rating && (
              <p className="text-sm text-navy-500">
                Obrigado pela avaliação ({rating} {rating === 1 ? "estrela" : "estrelas"})! Você
                também pode avaliar depois em "Aulas".
              </p>
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
      className="flex items-center justify-between gap-2 rounded-lg border border-navy-900/8 bg-navy-50 px-3.5 py-2.5 text-sm text-navy-700 hover:bg-navy-100"
    >
      <span className="font-medium">{label}</span>
      <span className="flex items-center gap-1 truncate text-xs">
        {signature.slice(0, 8)}...{signature.slice(-8)}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </span>
    </a>
  );
}
