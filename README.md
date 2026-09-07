# EdTech Marketplace

Marketplace de aulas particulares avulsas sob demanda: o aluno busca um professor,
paga com segurança e entra direto numa aula por vídeo — sem mensalidade. O
pagamento fica **retido em escrow on-chain na Solana (devnet)** até a aula ser
confirmada como concluída, e só então é liberado ao professor.

Construído para a **Trilha Solana do Hackathon Solana & Cursor — Passo Fundo**.

Live: https://edtechoficial.vercel.app

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** — tema claro/escuro (`dark:` via classe), tokens de cor próprios
- **Supabase** — Auth (email/senha + Google OAuth), Postgres (RLS), Storage
- **Solana devnet** — `@solana/web3.js` + `@solana/wallet-adapter-react` (Phantom/Solflare)
- **i18n** próprio (PT/EN) via cookie, lido no servidor — sem libs externas
- Deploy contínuo na **Vercel**

## Escrow on-chain (o núcleo técnico do projeto)

Não existe programa on-chain próprio (deploy de um programa Anchor exigiria
toolchain de Rust que não coube no prazo) — o fluxo usa transferências reais
de SOL via `SystemProgram`, o que já demonstra o uso genuíno da stack Solana:

1. O aluno conecta a carteira (Phantom/Solflare, devnet) e paga o valor da aula.
   A transação vai da carteira do aluno pra uma carteira "cofre" da plataforma
   (`lib/solana/vault.ts`, chave privada só no servidor). **Transação real,
   verificável no Solana Explorer.**
2. Quando a aula é marcada como concluída, uma segunda transação real libera o
   valor do cofre pra carteira do professor (`app/api/escrow/release/route.ts`).
3. Cada transação retorna um `signature` real, exibido na UI com link direto
   pro Explorer (`?cluster=devnet`).

Ver também `app/demo-aula` — uma demonstração isolada do escrow, fora do fluxo
de agendamento, útil pra testar rapidamente sem precisar de um professor
publicado.

## Estrutura principal

```
app/
  page.tsx                 landing page (pt/en)
  login/                   login/cadastro (email+senha, Google OAuth)
  auth/callback/           troca o código OAuth por sessão
  sucesso/                 tela de transição pós-login (~1s) → /app
  demo-aula/               demo isolada do escrow Solana
  app/                     área logada (dashboard, calendário, chat, perfil...)
    page.tsx                 dashboard: grade de professores (reais + demo)
    professor/[id]/           perfil público do professor + agendar aula
    publicar/                 professor publica seu perfil (aparece no dashboard)
    calendario/                agenda real (aulas marcadas + eventos manuais)
    aulas/                     aulas passadas + avaliação
    chat/                      chat com professores (mock, sem persistência ainda)
    ganhos/                    professor: total recebido, gráfico, avaliações
    perfil/                    conta, tema, idioma, dados profissionais (CPF/CEP)
  api/escrow/release/       libera o pagamento retido (assinado pelo cofre)
components/
  solana/                  wallet provider, demo de escrow
  app/                     shell da área logada (sidebar, topbar, calendário...)
  landing/                 seções da landing page
  ui/                      primitivos (Button, Card, Input...)
lib/
  supabase/                clients (browser/server)
  solana/                  conexão devnet, carteira-cofre
  i18n/                    dicionário PT/EN + leitura do cookie no servidor
  professors.ts            mescla professores mockados + reais (professor_profiles)
supabase/*.sql             migrações — rodar uma vez no SQL Editor (veja abaixo)
```

## Rodar localmente

```bash
npm install
cp .env.local.example .env.local   # preencha com suas chaves (Supabase + Solana)
npm run dev
```
Abre em http://localhost:3000

## Configuração do backend (Supabase)

### 1. Variáveis de ambiente
No dashboard do Supabase (Settings > API):
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Solana (gere com `node scripts/generate-vault-keypair.mjs`):
- `SOLANA_VAULT_SECRET_KEY` — chave privada do cofre (nunca `NEXT_PUBLIC_`)
- `NEXT_PUBLIC_SOLANA_VAULT_ADDRESS` — endereço público do cofre

Cole no `.env.local` (local) **e** em Vercel > Settings > Environment Variables.
Depois de mudar na Vercel, é preciso Redeploy.

### 2. Rodar as migrações SQL (uma vez, no SQL Editor do Supabase)
Nesta ordem:
1. `supabase/avatars-bucket.sql` — bucket de foto de perfil
2. `supabase/publish-profile.sql` — tabela `professor_profiles` + bucket de diploma
3. `supabase/calendar-earnings-reviews.sql` — tabelas `calendar_events`, `payments`, `reviews`

### 3. Financiar o cofre com SOL de teste
https://faucet.solana.com → cole o endereço de `NEXT_PUBLIC_SOLANA_VAULT_ADDRESS` → devnet.

### 4. Login com Google (opcional)
1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) > OAuth Client ID > Web application.
2. Redirect URI: `https://SEU-PROJETO.supabase.co/auth/v1/callback`.
3. Cole Client ID/Secret em Supabase > Authentication > Providers > Google.

## Fluxo de teste ponta a ponta

1. `/login` → cadastro como **Professor** → completa dados profissionais (CPF/CEP,
   ou "ID/Postal code" genérico se o idioma estiver em inglês) → `/app/publicar`.
2. Numa segunda conta (ou aba anônima), cadastro como **Aluno**.
3. Aluno abre o professor publicado, escolhe um horário, conecta a carteira
   (devnet) e paga — gera uma transação real.
4. Confirma a aula ("simular fim da aula") — libera o pagamento (segunda
   transação real) e pede uma avaliação.
5. Professor confere em `/app/ganhos`: valor recebido, gráfico e a avaliação.
6. Ambos veem a aula em `/app/calendario`.
