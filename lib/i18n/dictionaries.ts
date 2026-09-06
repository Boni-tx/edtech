export type Locale = "pt" | "en";

type SidebarDict = {
  professors: string;
  calendar: string;
  lessons: string;
  chat: string;
  solanaDemo: string;
  publishProfile: string;
  settings: string;
};

type TopbarDict = { hello: string };

type DashboardDict = { title: string; count: string; countOne: string };

type CalendarDict = { title: string; none: string };

type LessonsDict = { title: string; rate: string };

type ChatDict = { title: string; placeholder: string; empty: string };

type PerfilDict = {
  title: string;
  name: string;
  email: string;
  role: string;
  roleStudent: string;
  roleTeacher: string;
  save: string;
  saving: string;
  saved: string;
  logout: string;
  preferences: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  language: string;
};

type ProfessorDict = { back: string; reviews: string };

type BookingDict = { title: string; subtitle: string; pay: string; payAndBook: string };

export type Dictionary = {
  sidebar: SidebarDict;
  topbar: TopbarDict;
  dashboard: DashboardDict;
  calendar: CalendarDict;
  lessons: LessonsDict;
  chat: ChatDict;
  perfil: PerfilDict;
  professor: ProfessorDict;
  booking: BookingDict;
};

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    sidebar: {
      professors: "Professores",
      calendar: "Calendário",
      lessons: "Aulas",
      chat: "Chat",
      solanaDemo: "Demonstração Solana",
      publishProfile: "Publicar perfil de professor",
      settings: "Configurações",
    },
    topbar: {
      hello: "Olá,",
    },
    dashboard: {
      title: "Professores disponíveis agora",
      count: "professores",
      countOne: "professor",
    },
    calendar: {
      title: "Aulas agendadas",
      none: "Você ainda não tem aulas agendadas.",
    },
    lessons: {
      title: "Aulas passadas",
      rate: "Avaliar",
    },
    chat: {
      title: "Conversas",
      placeholder: "Digite uma mensagem...",
      empty: "Envie uma mensagem pra começar a conversa.",
    },
    perfil: {
      title: "Configurações do perfil",
      name: "Nome completo",
      email: "Email",
      role: "Perfil",
      roleStudent: "Aluno",
      roleTeacher: "Professor",
      save: "Salvar alterações",
      saving: "Salvando...",
      saved: "Salvo!",
      logout: "Sair",
      preferences: "Preferências",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Escuro",
      language: "Idioma",
    },
    professor: {
      back: "Voltar",
      reviews: "avaliações",
    },
    booking: {
      title: "Agendar aula",
      subtitle: "Pagamento protegido: fica retido em escrow (Solana devnet) até a aula ser confirmada.",
      pay: "Pagar",
      payAndBook: "e reservar horário",
    },
  },
  en: {
    sidebar: {
      professors: "Tutors",
      calendar: "Calendar",
      lessons: "Lessons",
      chat: "Chat",
      solanaDemo: "Solana demo",
      publishProfile: "Publish tutor profile",
      settings: "Settings",
    },
    topbar: {
      hello: "Hello,",
    },
    dashboard: {
      title: "Tutors available now",
      count: "tutors",
      countOne: "tutor",
    },
    calendar: {
      title: "Scheduled lessons",
      none: "You don't have any scheduled lessons yet.",
    },
    lessons: {
      title: "Past lessons",
      rate: "Rate",
    },
    chat: {
      title: "Conversations",
      placeholder: "Type a message...",
      empty: "Send a message to start the conversation.",
    },
    perfil: {
      title: "Profile settings",
      name: "Full name",
      email: "Email",
      role: "Role",
      roleStudent: "Student",
      roleTeacher: "Tutor",
      save: "Save changes",
      saving: "Saving...",
      saved: "Saved!",
      logout: "Log out",
      preferences: "Preferences",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      language: "Language",
    },
    professor: {
      back: "Back",
      reviews: "reviews",
    },
    booking: {
      title: "Book a lesson",
      subtitle: "Protected payment: held in escrow (Solana devnet) until the lesson is confirmed.",
      pay: "Pay",
      payAndBook: "and book slot",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
