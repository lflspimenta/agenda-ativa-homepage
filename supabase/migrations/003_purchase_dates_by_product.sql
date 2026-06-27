alter table public.users
  add column if not exists wedding_purchase_date timestamptz,
  add column if not exists imobiliario_purchase_date timestamptz;

update public.users
set wedding_purchase_date = purchase_date
where wedding_purchase_date is null
  and products @> array['wedding']::text[];

update public.users
set imobiliario_purchase_date = purchase_date
where imobiliario_purchase_date is null
  and products @> array['imobiliario']::text[];
