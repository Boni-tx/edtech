"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ProfileForm({
  initialName,
  email,
  role,
}: {
  initialName: string;
  email: string;
  role: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: name } });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-2xl font-bold text-white">
        {name.charAt(0).toUpperCase() || "?"}
      </div>

      <div>
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={email} disabled />
      </div>

      <div>
        <Label>Perfil</Label>
        <Input value={role === "professor" ? "Professor" : "Aluno"} disabled />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={saving}>
        {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar alterações"}
      </Button>
    </form>
  );
}
