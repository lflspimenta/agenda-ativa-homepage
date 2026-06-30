alter table public.users
  add column if not exists medicina_estetica_purchase_date timestamptz;

update public.users
set medicina_estetica_purchase_date = purchase_date
where medicina_estetica_purchase_date is null
  and products @> array['medicina_estetica']::text[];
