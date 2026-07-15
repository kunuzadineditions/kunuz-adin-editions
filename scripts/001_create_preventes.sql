-- Migration : table preventes
-- Projet Supabase : onheefximpjaatzdmctn

create table if not exists preventes (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  prenom               text not null,
  email                text not null,
  pays                 text not null,
  qte_livre            int not null default 0,
  qte_carnet           int not null default 0,
  prix_livre_unitaire  numeric,
  carnet_prix_unitaire numeric,
  remise_livre         boolean not null default false,
  remise_carnet        boolean not null default false,
  total_indicatif      numeric,

  constraint au_moins_un_produit check (qte_livre > 0 or qte_carnet > 0)
);

-- Index pour accélérer les calculs de stock -20%
create index if not exists idx_preventes_remise_livre  on preventes (remise_livre)  where remise_livre  = true;
create index if not exists idx_preventes_remise_carnet on preventes (remise_carnet) where remise_carnet = true;

-- Vue utilitaire : exemplaires -20% déjà réservés et places restantes
create or replace view v_stock_prevente as
select
  greatest(0, 100 - coalesce(sum(qte_livre)  filter (where remise_livre  = true), 0)) as places_livre_restantes,
  greatest(0, 100 - coalesce(sum(qte_carnet) filter (where remise_carnet = true), 0)) as places_carnet_restantes
from preventes;

-- RLS : désactivé par défaut, à activer si besoin d'espace client
alter table preventes enable row level security;

-- Politique d'insertion publique (anon peut insérer via le formulaire de prévente)
create policy "insert_preventes_publique"
  on preventes for insert
  to anon
  with check (true);

-- Lecture interdite pour anon (admin uniquement via service_role)
create policy "select_preventes_admin"
  on preventes for select
  to service_role
  using (true);
