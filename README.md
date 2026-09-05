# EdTech Marketplace — Landing Page + Autenticação (MVP 0.1)

## Rodar localmente
```bash
npm install
cp .env.local.example .env.local   # preencha com suas chaves do Supabase
npm run dev
```
Abre em http://localhost:3000

## Estrutura
- `app/page.tsx` — landing page
- `app/login/page.tsx` — login/cadastro (email+senha real via Supabase, + Google OAuth)
- `app/auth/callback/route.ts` — troca o código do OAuth por uma sessão
- `app/sucesso/page.tsx` — rota protegida, só acessível logado (checa sessão no servidor)
- `lib/supabase/client.ts` — client do Supabase pro navegador
- `lib/supabase/server.ts` — client do Supabase pro servidor
- `middleware.ts` — mantém a sessão sempre renovada

## Configurar autenticação real (Supabase)

### 1. Variáveis de ambiente
No dashboard do Supabase: Settings > API, copie:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Cole essas duas no `.env.local` (local) **e** em Vercel > Settings > Environment Variables (produção). Depois de adicionar na Vercel, é preciso fazer um Redeploy pra elas entrarem em vigor.

### 2. Login por email/senha
Já vem ativado por padrão no Supabase. Nada a fazer.

Por padrão, o Supabase exige confirmação de email antes do primeiro login
(a pessoa recebe um link por email). Se quiser testar mais rápido sem
esse passo: Authentication > Providers > Email > desmarque "Confirm email".
**Não recomendado deixar desmarcado em produção.**

### 3. Login com Google (opcional, mas o código já está pronto)
1. Vá no [Google Cloud Console](https://console.cloud.google.com/apis/credentials) > Create Credentials > OAuth Client ID > tipo "Web application".
2. Em "Authorized redirect URIs", adicione a URL de callback que aparece no Supabase em Authentication > Providers > Google (algo como `https://SEU-PROJETO.supabase.co/auth/v1/callback`).
3. Copie o Client ID e Client Secret gerados pelo Google.
4. No Supabase: Authentication > Providers > Google, ative e cole o Client ID/Secret.
5. Salve.

### 4. URLs de redirecionamento
Authentication > URL Configuration no Supabase:
- Site URL: `https://edtechoficial.vercel.app`
- Redirect URLs: `https://edtechoficial.vercel.app/auth/callback` e `http://localhost:3000/auth/callback`

## Fluxo de teste
1. Acesse `/login`, crie uma conta na aba Cadastrar.
2. Se a confirmação de email estiver ativa, confira sua caixa de entrada.
3. Faça login — deve redirecionar automaticamente para `/sucesso`.
4. `/sucesso` mostra "Êxito na autenticação" com seu email e um botão Sair.
5. Tente acessar `/sucesso` sem estar logado (aba anônima) — deve te mandar de volta pro `/login`.
