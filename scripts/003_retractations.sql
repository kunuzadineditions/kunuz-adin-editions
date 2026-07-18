-- Migration : table des demandes de droit de rétractation
-- Projet Supabase : onheefximpjaatzdmctn
-- À exécuter dans l'éditeur SQL de Supabase avant le lancement des ventes

create table if not exists retractations (
  id                uuid        primary key default gen_random_uuid(),
  created_at        timestamptz not null    default now(),
  nom               text        not null,
  prenom            text        not null,
  email             text        not null,
  numero_commande   text        not null,
  details_commande  text        not null,
  date_retractation timestamptz not null    default now()
);

-- Activer RLS
alter table retractations enable row level security;

-- Le rôle anon peut insérer (soumission du formulaire web)
create policy "insert_retractation_anon"
  on retractations
  for insert
  to anon
  with check (true);

-- Pas de politique select pour anon :
-- les demandes ne sont lisibles que via le service role (backend)
