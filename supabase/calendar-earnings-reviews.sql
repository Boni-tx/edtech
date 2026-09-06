-- Rode isso uma vez no SQL Editor do Supabase. Cria:
-- 1) calendar_events — agenda real (manual ou de aulas marcadas), compartilhada
--    entre aluno e professor de uma mesma aula.
-- 2) payments — histórico de repasses recebidos pelo professor (pra tela de ganhos).
-- 3) reviews — avaliações dos alunos, exibidas na tela de ganhos do professor.

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subtitle text,
  scheduled_at timestamptz not null,
  source text not null default 'manual',
  counterparty_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.calendar_events enable row level security;

create policy "Users view their own calendar events"
on public.calendar_events for select
using (auth.uid() = owner_id);

-- Permite criar um evento pra si mesmo, OU na agenda de um professor
-- publicado (é assim que agendar uma aula com ele aparece no calendário dele).
create policy "Users create events for themselves or a published professor"
on public.calendar_events for insert
with check (
  owner_id = auth.uid()
  or exists (select 1 from public.professor_profiles pp where pp.user_id = calendar_events.owner_id)
);

create policy "Users update their own calendar events"
on public.calendar_events for update
using (auth.uid() = owner_id);

create policy "Users delete their own calendar events"
on public.calendar_events for delete
using (auth.uid() = owner_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  professor_user_id uuid not null references auth.users(id) on delete cascade,
  student_name text,
  amount_sol numeric not null,
  tx_signature text,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Professors view their own payments"
on public.payments for select
using (auth.uid() = professor_user_id);

create policy "Authenticated users can record a payment"
on public.payments for insert
with check (auth.role() = 'authenticated');

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  professor_user_id uuid not null references auth.users(id) on delete cascade,
  student_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Anyone can view reviews"
on public.reviews for select
using (true);

create policy "Authenticated users can add a review"
on public.reviews for insert
with check (auth.role() = 'authenticated');
