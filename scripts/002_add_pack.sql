-- Migration : ajout du mode pack à la table preventes
-- Projet Supabase : onheefximpjaatzdmctn
-- Déjà exécutée en base — conservée ici pour référence

alter table preventes
  add column if not exists qte_pack            int     not null default 0,
  add column if not exists prix_pack_unitaire  numeric,
  add column if not exists remise_pack         boolean not null default false;

-- Contrainte mise à jour : au moins un produit parmi les trois
alter table preventes drop constraint if exists au_moins_un_produit;
alter table preventes add constraint au_moins_un_produit
  check (qte_livre > 0 or qte_carnet > 0 or qte_pack > 0);

-- Vue mise à jour : le pack consomme 1 slot livre ET 1 slot carnet quand remisé
create or replace view v_stock_prevente as
select
  greatest(0, 100
    - coalesce(sum(qte_livre) filter (where remise_livre = true), 0)
    - coalesce(sum(qte_pack)  filter (where remise_pack  = true), 0)
  ) as places_livre_restantes,
  greatest(0, 100
    - coalesce(sum(qte_carnet) filter (where remise_carnet = true), 0)
    - coalesce(sum(qte_pack)   filter (where remise_pack   = true), 0)
  ) as places_carnet_restantes
from preventes;
