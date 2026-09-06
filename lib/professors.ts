import { createClient } from "@/lib/supabase/server";
import { MOCK_PROFESSORS, type Professor } from "@/lib/mock/professors";

type ProfessorProfileRow = {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  bio: string;
  photo_url: string | null;
  wallet_address: string;
  price_sol: number;
  rating: number;
  reviews_count: number;
};

const PROFESSOR_COLUMNS =
  "id,user_id,name,subject,bio,photo_url,wallet_address,price_sol,rating,reviews_count";

function rowToProfessor(row: ProfessorProfileRow): Professor {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    subject: row.subject,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    priceSol: row.price_sol,
    gradient: "from-navy-700 to-navy-500",
    bio: row.bio,
    walletAddress: row.wallet_address,
    photoUrl: row.photo_url ?? undefined,
  };
}

/**
 * Une os professores mockados (fixos, pra demo) com os que já se
 * publicaram de verdade na tabela `professor_profiles`. Se a tabela
 * ainda não existir (SQL não rodado), simplesmente ignora e mostra só
 * os mockados — não derruba a página.
 */
export async function getAllProfessors(): Promise<Professor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("professor_profiles")
    .select(PROFESSOR_COLUMNS)
    .eq("published", true);

  const real = !error && data ? data.map(rowToProfessor) : [];
  return [...MOCK_PROFESSORS, ...real];
}

export async function getProfessorById(id: string): Promise<Professor | null> {
  const mockMatch = MOCK_PROFESSORS.find((p) => p.id === id);
  if (mockMatch) return mockMatch;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("professor_profiles")
    .select(PROFESSOR_COLUMNS)
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return rowToProfessor(data);
}
