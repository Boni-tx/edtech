-- Rode isso uma vez no SQL Editor do Supabase pra habilitar a publicação
-- de perfis de professor (aparecem na aba de Aulas / dashboard pra todo mundo).

create table if not exists public.professor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  subject text not null,
  bio text not null,
  photo_url text,
  wallet_address text not null,
  cep text not null,
  telefone text not null,
  diploma_url text,
  price_sol numeric not null default 0.01,
  rating numeric not null default 0,
  reviews_count integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.professor_profiles enable row level security;

create policy "Published professor profiles are viewable by everyone"
on public.professor_profiles for select
using (published = true);

create policy "Users can view their own professor profile"
on public.professor_profiles for select
using (auth.uid() = user_id);

create policy "Users can insert their own professor profile"
on public.professor_profiles for insert
with check (auth.uid() = user_id);

create policy "Users can update their own professor profile"
on public.professor_profiles for update
using (auth.uid() = user_id);

-- Bucket privado pra diploma/comprovante (não é público como o de avatares).
insert into storage.buckets (id, name, public)
values ('diplomas', 'diplomas', false)
on conflict (id) do nothing;

create policy "Users can upload their own diploma"
on storage.objects for insert
with check (bucket_id = 'diplomas' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view their own diploma"
on storage.objects for select
using (bucket_id = 'diplomas' and (storage.foldername(name))[1] = auth.uid()::text);
