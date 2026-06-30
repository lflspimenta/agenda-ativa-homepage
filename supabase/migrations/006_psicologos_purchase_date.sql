alter table public.users
  add column if not exists psicologos_purchase_date timestamptz;
