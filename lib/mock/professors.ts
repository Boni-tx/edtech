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
};

export const MOCK_PROFESSORS: Professor[] = [
  {
    id: "1",
    name: "Professor Teste",
    subject: "Matéria Teste",
    rating: 5,
    reviewsCount: 128,
    priceSol: 0.01,
    gradient: "from-navy-900 to-navy-700",
    bio: "Professor dedicado a reforço escolar personalizado, com foco em destravar dúvidas pontuais antes de provas. Aulas objetivas, direto ao ponto, adaptadas ao ritmo de cada aluno.",
    // Carteira de demonstração (devnet) — usada só pra mostrar o recebimento real do escrow.
    walletAddress: "3CrnsCFjd4tbKyGHubFDBGYHfAHeLHUUkijtZTmMcJZv",
  },
];

export const MOCK_TIME_SLOTS = [
  { id: "s1", label: "Hoje, 18:00" },
  { id: "s2", label: "Amanhã, 10:00" },
  { id: "s3", label: "Amanhã, 15:00" },
  { id: "s4", label: "Sexta, 09:00" },
];
