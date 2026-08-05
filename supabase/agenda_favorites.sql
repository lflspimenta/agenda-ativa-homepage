create table if not exists public.agenda_favorites (
  email text not null,
  product text not null,
  day_number integer not null check (day_number between 1 and 30),
  created_at timestamptz not null default now(),
  primary key (email, product, day_number)
);

alter table public.agenda_favorites enable row level security;
