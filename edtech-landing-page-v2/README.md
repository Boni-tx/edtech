# EdTech Marketplace — Landing Page (MVP 0.1)

## Rodar localmente
```bash
npm install
npm run dev
```
Abre em http://localhost:3000

## Estrutura
- `app/page.tsx` — monta as seções
- `components/landing/` — Hero, ProblemSolution, HowItWorks, TrustSection, Footer
- `components/landing/TiltCard.tsx` e `MagneticButton.tsx` — helpers de animação reutilizados nas seções

## Observação
Todo conteúdo dinâmico (sessão da hero, stats de confiança) está mockado
com comentário `// MOCK — substituir por fetch do Supabase depois`,
pronto para trocar por dados reais quando o banco estiver integrado.
