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

type LandingDict = {
  badge: string;
  headline1: string;
  headline2: string;
  headline3: string;
  subheadline: string;
  ctaFindTutor: string;
  ctaTeach: string;
  paymentProtected: string;
  mockConfirmed: string;
  mockRoomReady: string;
  mockHeldPayment: string;
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  trustTitle: string;
  trustSubtitle: string;
  trustPaymentTitle: string;
  trustPaymentDescription: string;
  trustReviewsTitle: string;
  trustReviewsDescription: string;
  trustRefundTitle: string;
  trustRefundDescription: string;
  footerAbout: string;
  footerTerms: string;
  footerPrivacy: string;
  footerContact: string;
  footerWorkWithUs: string;
  footerRights: string;
};

type ProfessionalDict = {
  title: string;
  description: string;
  idLabel: string;
  idPlaceholder: string;
  idError: string;
  postalCodeLabel: string;
  postalCodeError: string;
  postalCodeNotFound: string;
  postalCodeFetchError: string;
  addressLabel: string;
  numberLabel: string;
  complementLabel: string;
  complementPlaceholder: string;
  stateLabel: string;
  cityLabel: string;
  phoneLabel: string;
  save: string;
  saving: string;
  saved: string;
  modalTitle: string;
  modalDescription: string;
  modalCta: string;
  modalLater: string;
};

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
  landing: LandingDict;
  professional: ProfessionalDict;
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
    landing: {
      badge: "Professores particulares disponíveis agora",
      headline1: "Travou na matéria?",
      headline2: "Aula de reforço em minutos,",
      headline3: "não em semanas.",
      subheadline:
        "Encontre um professor particular por matéria, pague com segurança e entre direto na aula por vídeo. Sem pacote mensal, sem enrolação.",
      ctaFindTutor: "Encontrar um professor",
      ctaTeach: "Quero dar aulas",
      paymentProtected: "Pagamento protegido até o fim da aula",
      mockConfirmed: "Aula confirmada",
      mockRoomReady: "Sala pronta",
      mockHeldPayment: "Pagamento retido",
      problemTitle: "A prova é sexta e você ainda não entendeu a matéria",
      problemDescription:
        "Grupos de Facebook, professor particular que não responde, cursinho caro e com pacote mensal que você não precisa. Ajuda pontual virou um problema em si.",
      solutionTitle: "Aula avulsa, sob demanda, na matéria certa",
      solutionDescription:
        "Busque a disciplina, escolha um professor avaliado pela comunidade e agende uma aula só — sem assinatura, sem fidelidade.",
      howItWorksTitle: "Como funciona",
      howItWorksSubtitle: "Da dúvida à aula, em três passos — sem burocracia.",
      step1Title: "Busque a matéria",
      step1Description:
        "Digite a disciplina — Química, Matemática, História — e veja professores disponíveis com nota e preço por hora.",
      step2Title: "Agende e pague seguro",
      step2Description:
        "O valor fica retido na plataforma (escrow) e só é liberado ao professor depois que a aula acontece.",
      step3Title: "Aprenda na sala de vídeo",
      step3Description: "Entre na videochamada integrada, sem precisar instalar nada ou sair do site.",
      trustTitle: "Segurança em cada etapa",
      trustSubtitle: "Pensado para que aluno e professor confiem na plataforma, não só um no outro.",
      trustPaymentTitle: "Pagamento protegido",
      trustPaymentDescription:
        "O valor da aula fica retido na plataforma e só é repassado ao professor após a conclusão.",
      trustReviewsTitle: "Avaliado pela comunidade",
      trustReviewsDescription: "Professores são avaliados por estrelas a cada aula — sem exigência prévia de diploma.",
      trustRefundTitle: "Garantia de estorno",
      trustRefundDescription: "Problema com a aula? Você tem 24h para denunciar e receber 100% do valor de volta.",
      footerAbout: "Sobre",
      footerTerms: "Termos de Uso",
      footerPrivacy: "Privacidade",
      footerContact: "Contato",
      footerWorkWithUs: "Trabalhe Conosco (Professores)",
      footerRights: "Todos os direitos reservados.",
    },
    professional: {
      title: "Dados profissionais",
      description:
        "Usados pra verificação de identidade e repasse dos pagamentos. Visíveis só pra você e pra equipe da plataforma.",
      idLabel: "CPF",
      idPlaceholder: "000.000.000-00",
      idError: "CPF inválido.",
      postalCodeLabel: "CEP",
      postalCodeError: "CEP não encontrado.",
      postalCodeNotFound: "CEP não encontrado.",
      postalCodeFetchError: "Não foi possível consultar o CEP agora.",
      addressLabel: "Endereço",
      numberLabel: "Número",
      complementLabel: "Complemento",
      complementPlaceholder: "Apto, bloco... (opcional)",
      stateLabel: "Estado",
      cityLabel: "Cidade",
      phoneLabel: "Telefone",
      save: "Salvar dados profissionais",
      saving: "Salvando...",
      saved: "Salvo!",
      modalTitle: "Complete seu perfil profissional",
      modalDescription:
        "Professores com perfil completo (CPF, endereço, dados bancários e verificação) aparecem mais nas buscas e passam mais confiança pros alunos.",
      modalCta: "Completar perfil",
      modalLater: "Agora não",
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
    landing: {
      badge: "Tutors available right now",
      headline1: "Stuck on a subject?",
      headline2: "Get help in minutes,",
      headline3: "not weeks.",
      subheadline:
        "Find a private tutor for any subject, pay securely, and jump straight into a video lesson. No monthly plan, no hassle.",
      ctaFindTutor: "Find a tutor",
      ctaTeach: "I want to teach",
      paymentProtected: "Payment protected until the lesson ends",
      mockConfirmed: "Lesson confirmed",
      mockRoomReady: "Room ready",
      mockHeldPayment: "Payment held",
      problemTitle: "The test is Friday and you still don't get it",
      problemDescription:
        "Facebook groups, a tutor who never replies, an expensive course with a monthly plan you don't need. A one-off need for help became a problem of its own.",
      solutionTitle: "One-off lessons, on demand, in the right subject",
      solutionDescription:
        "Search the subject, pick a tutor rated by the community, and book a single lesson — no subscription, no lock-in.",
      howItWorksTitle: "How it works",
      howItWorksSubtitle: "From doubt to lesson, in three steps — no red tape.",
      step1Title: "Search the subject",
      step1Description:
        "Type in the subject — Chemistry, Math, History — and see available tutors with ratings and hourly rates.",
      step2Title: "Book and pay securely",
      step2Description:
        "The payment is held by the platform (escrow) and only released to the tutor after the lesson happens.",
      step3Title: "Learn in the video room",
      step3Description: "Join the built-in video call — no install, no leaving the site.",
      trustTitle: "Security at every step",
      trustSubtitle: "Built so students and tutors trust the platform, not just each other.",
      trustPaymentTitle: "Protected payment",
      trustPaymentDescription:
        "The lesson payment is held by the platform and only passed to the tutor after it's completed.",
      trustReviewsTitle: "Rated by the community",
      trustReviewsDescription: "Tutors are rated with stars after every lesson — no diploma required upfront.",
      trustRefundTitle: "Refund guarantee",
      trustRefundDescription: "Problem with the lesson? You have 24h to report it and get 100% of your money back.",
      footerAbout: "About",
      footerTerms: "Terms of Use",
      footerPrivacy: "Privacy",
      footerContact: "Contact",
      footerWorkWithUs: "Work With Us (Tutors)",
      footerRights: "All rights reserved.",
    },
    professional: {
      title: "Professional details",
      description:
        "Used for identity verification and payouts. Only visible to you and the platform team.",
      idLabel: "ID number (Brazilian CPF / Tax ID)",
      idPlaceholder: "000.000.000-00",
      idError: "Invalid ID number.",
      postalCodeLabel: "Postal code (Brazilian CEP)",
      postalCodeError: "Postal code not found.",
      postalCodeNotFound: "Postal code not found.",
      postalCodeFetchError: "Couldn't look up this postal code right now.",
      addressLabel: "Address",
      numberLabel: "Number",
      complementLabel: "Complement",
      complementPlaceholder: "Apt, block... (optional)",
      stateLabel: "State",
      cityLabel: "City",
      phoneLabel: "Phone",
      save: "Save professional details",
      saving: "Saving...",
      saved: "Saved!",
      modalTitle: "Complete your professional profile",
      modalDescription:
        "Tutors with a complete profile (ID, address, payout details and verification) rank higher in search and build more trust with students.",
      modalCta: "Complete profile",
      modalLater: "Not now",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
