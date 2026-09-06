"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PublicKey } from "@solana/web3.js";
import { Camera, CheckCircle2, FileUp, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { formatCEP } from "@/lib/validation";

type Initial = {
  name: string;
  subject: string;
  bio: string;
  photoUrl: string;
  walletAddress: string;
  cep: string;
  telefone: string;
  diplomaUrl: string;
};

export default function PublishProfileForm({ userId, initial }: { userId: string; initial: Initial }) {
  const router = useRouter();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const diplomaInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(initial);
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [published, setPublished] = useState(false);

  function update<K extends keyof Initial>(key: K, value: Initial[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploadingPhoto(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      setUploadingPhoto(false);
      setError("Falha ao enviar a foto: " + uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;
    await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
    update("photoUrl", publicUrl);
    setUploadingPhoto(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.photoUrl) {
      setError("Adicione uma foto.");
      return;
    }
    if (!form.name.trim() || !form.subject.trim() || !form.bio.trim()) {
      setError("Preencha nome, conteúdo e bio.");
      return;
    }
    if (form.cep.replace(/\D/g, "").length !== 8) {
      setError("Digite um CEP válido.");
      return;
    }
    if (!form.telefone.trim()) {
      setError("Digite um telefone.");
      return;
    }
    let walletAddress: string;
    try {
      walletAddress = new PublicKey(form.walletAddress.trim()).toBase58();
    } catch {
      setError("Endereço de carteira Solana inválido (necessário pra receber os pagamentos).");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    let diplomaUrl = form.diplomaUrl || null;
    if (diplomaFile) {
      const ext = diplomaFile.name.split(".").pop();
      const path = `${userId}/diploma.${ext}`;
      const { error: diplomaError } = await supabase.storage
        .from("diplomas")
        .upload(path, diplomaFile, { upsert: true });
      if (diplomaError) {
        setSaving(false);
        setError(
          diplomaError.message.includes("Bucket not found")
            ? "O bucket 'diplomas' ainda não existe no Supabase (rode o SQL de publicação)."
            : "Falha ao enviar o diploma: " + diplomaError.message
        );
        return;
      }
      diplomaUrl = path;
    }

    const { error: upsertError } = await supabase.from("professor_profiles").upsert(
      {
        user_id: userId,
        name: form.name.trim(),
        subject: form.subject.trim(),
        bio: form.bio.trim(),
        photo_url: form.photoUrl,
        wallet_address: walletAddress,
        cep: form.cep,
        telefone: form.telefone,
        diploma_url: diplomaUrl,
        published: true,
      },
      { onConflict: "user_id" }
    );

    if (upsertError) {
      setSaving(false);
      setError(
        upsertError.message.includes("does not exist")
          ? "A tabela 'professor_profiles' ainda não existe no Supabase (rode supabase/publish-profile.sql)."
          : "Falha ao publicar: " + upsertError.message
      );
      return;
    }

    // Mantém CEP/telefone sincronizados com os dados profissionais da conta.
    await supabase.auth.updateUser({ data: { cep: form.cep, telefone: form.telefone } });

    setSaving(false);
    setPublished(true);
    router.refresh();
  }

  if (published) {
    return (
      <div className="rounded-2xl border border-confirm-500/20 bg-confirm-500/5 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-confirm-600" />
        <h3 className="text-lg font-bold text-navy-900 dark:text-white">Perfil publicado!</h3>
        <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
          Você já aparece na aba de Aulas pros alunos.
        </p>
        <Button className="mt-5" size="lg" onClick={() => router.push("/app")}>
          Ver na aba de Aulas
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900"
    >
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-navy-900 text-2xl font-bold text-white dark:bg-white dark:text-navy-900"
        >
          {form.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.photoUrl} alt={form.name} className="h-full w-full object-cover" />
          ) : (
            form.name.charAt(0).toUpperCase() || "?"
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            {uploadingPhoto ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Camera className="h-5 w-5 text-white" />
            )}
          </div>
        </button>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      <div>
        <Label htmlFor="pub-name">Nome</Label>
        <Input id="pub-name" value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div>
        <Label htmlFor="pub-subject">O que você vai ensinar</Label>
        <Input
          id="pub-subject"
          placeholder="Ex.: Violão, Cálculo Avançado, Redação..."
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pub-bio">Pequena bio</Label>
        <textarea
          id="pub-bio"
          rows={3}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          className="flex w-full rounded-lg border border-navy-900/15 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-300 focus-visible:border-navy-900/30 focus-visible:ring-2 focus-visible:ring-navy-900/15 dark:border-white/15 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-500"
        />
      </div>

      <div>
        <Label htmlFor="pub-cep">CEP</Label>
        <Input
          id="pub-cep"
          placeholder="00000-000"
          value={form.cep}
          onChange={(e) => update("cep", formatCEP(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="pub-telefone">Telefone</Label>
        <Input
          id="pub-telefone"
          placeholder="(00) 00000-0000"
          value={form.telefone}
          onChange={(e) => update("telefone", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pub-wallet">Carteira Solana (devnet) pra receber pagamentos</Label>
        <Input
          id="pub-wallet"
          placeholder="Endereço público da sua carteira"
          value={form.walletAddress}
          onChange={(e) => update("walletAddress", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="pub-diploma">Diploma ou comprovante (opcional)</Label>
        <button
          type="button"
          onClick={() => diplomaInputRef.current?.click()}
          className="flex w-full items-center gap-2 rounded-lg border border-dashed border-navy-900/20 px-3.5 py-2.5 text-sm text-navy-500 hover:border-navy-900/40 dark:border-white/20 dark:text-navy-300 dark:hover:border-white/40"
        >
          <FileUp className="h-4 w-4" />
          {diplomaFile ? diplomaFile.name : form.diplomaUrl ? "Arquivo já enviado — trocar" : "Selecionar arquivo"}
        </button>
        <input
          ref={diplomaInputRef}
          id="pub-diploma"
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => setDiplomaFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={saving || uploadingPhoto}>
        {saving ? "Publicando..." : "Publicar perfil"}
      </Button>
    </form>
  );
}
