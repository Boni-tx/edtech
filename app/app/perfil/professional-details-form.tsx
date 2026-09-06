"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isValidCPF, formatCPF, formatCEP } from "@/lib/validation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

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

export default function ProfessionalDetailsForm({
  initial,
  dict,
}: {
  initial: Initial;
  dict: Dictionary["professional"];
}) {
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
        setCepError(dict.postalCodeNotFound);
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
      setCepError(dict.postalCodeFetchError);
    } finally {
      setCepLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCpfError(null);

    if (!isValidCPF(form.cpf)) {
      setCpfError(dict.idError);
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
      <h3 className="mb-1 text-sm font-bold text-navy-900 dark:text-white">{dict.title}</h3>
      <p className="mb-5 text-xs text-navy-500 dark:text-navy-300">{dict.description}</p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cpf">{dict.idLabel}</Label>
          <Input
            id="cpf"
            placeholder={dict.idPlaceholder}
            value={form.cpf}
            onChange={(e) => update("cpf", formatCPF(e.target.value))}
            className={cpfError ? "border-red-400 focus-visible:ring-red-200" : undefined}
          />
          {cpfError && <p className="mt-1.5 text-xs font-medium text-red-500">{cpfError}</p>}
        </div>

        <div>
          <Label htmlFor="cep">{dict.postalCodeLabel}</Label>
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
            <Label htmlFor="logradouro">{dict.addressLabel}</Label>
            <Input
              id="logradouro"
              value={form.logradouro}
              onChange={(e) => update("logradouro", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="numero">{dict.numberLabel}</Label>
            <Input id="numero" value={form.numero} onChange={(e) => update("numero", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Label htmlFor="complemento">{dict.complementLabel}</Label>
            <Input
              id="complemento"
              placeholder={dict.complementPlaceholder}
              value={form.complemento}
              onChange={(e) => update("complemento", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="uf">{dict.stateLabel}</Label>
            <Input id="uf" value={form.uf} onChange={(e) => update("uf", e.target.value.toUpperCase().slice(0, 2))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="cidade">{dict.cityLabel}</Label>
            <Input id="cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="telefone">{dict.phoneLabel}</Label>
            <Input
              id="telefone"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={(e) => update("telefone", e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={saving}>
          {saving ? dict.saving : saved ? dict.saved : dict.save}
        </Button>
      </div>
    </form>
  );
}
