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
  { id: "1", name: "Camila Duarte", subject: "Química", rating: 5, reviewsCount: 128, priceSol: 0.02, gradient: "from-navy-900 to-navy-700" },
  { id: "2", name: "Rafael Nogueira", subject: "Matemática", rating: 5, reviewsCount: 94, priceSol: 0.015, gradient: "from-confirm-600 to-confirm-400" },
  { id: "3", name: "Beatriz Alencar", subject: "Física", rating: 4, reviewsCount: 61, priceSol: 0.02, gradient: "from-navy-700 to-navy-500" },
  { id: "4", name: "Thiago Ramos", subject: "História", rating: 5, reviewsCount: 47, priceSol: 0.01, gradient: "from-navy-500 to-navy-300" },
  { id: "5", name: "Larissa Prado", subject: "Biologia", rating: 4, reviewsCount: 39, priceSol: 0.015, gradient: "from-confirm-500 to-confirm-400" },
  { id: "6", name: "Eduardo Lima", subject: "Redação", rating: 5, reviewsCount: 82, priceSol: 0.01, gradient: "from-navy-900 to-navy-500" },
  { id: "7", name: "Juliana Freitas", subject: "Inglês", rating: 5, reviewsCount: 110, priceSol: 0.02, gradient: "from-navy-700 to-confirm-500" },
  { id: "8", name: "Marcos Vinícius", subject: "Geografia", rating: 4, reviewsCount: 28, priceSol: 0.01, gradient: "from-navy-500 to-navy-700" },
];
