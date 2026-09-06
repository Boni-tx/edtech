export type Professor = {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviewsCount: number;
  priceSol: number;
  gradient: string;
  bio: string;
  walletAddress: string;
  photoUrl?: string;
  // Id de auth.users do professor — só existe pra professores reais
  // (professor_profiles). Usado pra gravar no calendário/ganhos/avaliações dele.
  userId?: string;
};

// Vazio de propósito — os professores agora vêm todos de verdade da tabela
// professor_profiles (veja lib/professors.ts).
export const MOCK_PROFESSORS: Professor[] = [];

export const MOCK_TIME_SLOTS = [
  { id: "s1", label: "Hoje, 18:00" },
  { id: "s2", label: "Amanhã, 10:00" },
  { id: "s3", label: "Amanhã, 15:00" },
  { id: "s4", label: "Sexta, 09:00" },
];
