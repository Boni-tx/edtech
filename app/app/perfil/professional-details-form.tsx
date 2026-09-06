"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isValidCPF, formatCPF, formatCEP } from "@/lib/validation";

type Initial = {
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone: string;
};

export default function ProfessionalDetailsForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof Initial>(key: K, value: Initial[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCepBlur() {
    const digits = form.cep.replace(/\D/g, "");
    if (digits.length !== 8) return;

    setCepError(null);
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro || prev.logradouro,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          uf: data.uf || prev.uf,
        }));
      }
    } catch {
      setCepError("Não foi possível consultar o CEP agora.");
    } finally {
      setCepLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCpfError(null);

    if (!isValidCPF(form.cpf)) {
      setCpfError("CPF inválido.");
      return;
    }

    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { ...form } });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form
      id="dados-profissionais"
      onSubmit={handleSubmit}
      className="scroll-mt-8 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900"
    >
      <h3 className="mb-1 text-sm font-bold text-navy-900 dark:text-white">Dados profissionais</h3>
      <p className="mb-5 text-xs text-navy-500 dark:text-navy-300">
        Usados pra verificação de identidade e repasse dos pagamentos. Visíveis só pra você e pra
        equipe da plataforma.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={(e) => update("cpf", formatCPF(e.target.value))}
            className={cpfError ? "border-red-400 focus-visible:ring-red-200" : undefined}
          />
          {cpfError && <p className="mt-1.5 text-xs font-medium text-red-500">{cpfError}</p>}
        </div>

        <div>
          <Label htmlFor="cep">CEP</Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
            <Input
              id="cep"
              placeholder="00000-000"
              className="pl-10"
              value={form.cep}
              onChange={(e) => update("cep", formatCEP(e.target.value))}
              onBlur={handleCepBlur}
            />
            {cepLoading && (
              <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-navy-300" />
            )}
          </div>
          {cepError && <p className="mt-1.5 text-xs font-medium text-red-500">{cepError}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Label htmlFor="logradouro">Endereço</Label>
            <Input
              id="logradouro"
              value={form.logradouro}
              onChange={(e) => update("logradouro", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" value={form.numero} onChange={(e) => update("numero", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              placeholder="Apto, bloco... (opcional)"
              value={form.complemento}
              onChange={(e) => update("complemento", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="uf">Estado</Label>
            <Input id="uf" value={form.uf} onChange={(e) => update("uf", e.target.value.toUpperCase().slice(0, 2))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={(e) => update("telefone", e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={saving}>
          {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar dados profissionais"}
        </Button>
      </div>
    </form>
  );
}
