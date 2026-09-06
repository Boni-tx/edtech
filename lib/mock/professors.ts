export type Professor = {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviewsCount: number;
  priceSol: number;
  gradient: string;
};

export const MOCK_PROFESSORS: Professor[] = [
  {
    id: "1",
    name: "Professor Teste",
    subject: "Matéria Teste",
    rating: 5,
    reviewsCount: 128,
    priceSol: 0.02,
    gradient: "from-navy-900 to-navy-700",
  },
];
