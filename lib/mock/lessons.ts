import { MOCK_PROFESSORS } from "./professors";

export type Lesson = {
  id: string;
  professorId: string;
  date: string; // ISO
  status: "agendada" | "concluida";
  myRating?: number;
};

const professorByIndex = (i: number) => MOCK_PROFESSORS[i % MOCK_PROFESSORS.length];

export const MOCK_UPCOMING_LESSONS: Lesson[] = [
  { id: "u1", professorId: professorByIndex(0).id, date: "2026-09-08T14:00:00", status: "agendada" },
  { id: "u2", professorId: professorByIndex(2).id, date: "2026-09-09T10:30:00", status: "agendada" },
];

export const MOCK_PAST_LESSONS: Lesson[] = [
  { id: "p1", professorId: professorByIndex(1).id, date: "2026-08-28T16:00:00", status: "concluida", myRating: 5 },
  { id: "p2", professorId: professorByIndex(3).id, date: "2026-08-20T09:00:00", status: "concluida" },
  { id: "p3", professorId: professorByIndex(4).id, date: "2026-08-15T18:00:00", status: "concluida" },
];
