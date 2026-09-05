import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EscrowDemo from "@/components/solana/EscrowDemo";

export default async function DemoAulaPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <EscrowDemo />
    </main>
  );
}
