alter table public.users
  add column if not exists advogados_purchase_date timestamptz;

update public.users
set advogados_purchase_date = purchase_date
where advogados_purchase_date is null
  and products @> array['advogados']::text[];
