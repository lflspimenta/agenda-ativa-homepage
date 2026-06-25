# Agenda Ativa™ Wedding Planner — MVP

Primeira versão funcional da agenda digital premium.

## O Que Está Incluído

- Entrada por email com Magic Link.
- Conteúdo sequencial por data de compra.
- Dia atual calculado por `purchase_date`.
- Limite no Dia 30.
- Botão para copiar título, legenda e CTA.
- Webhook Stripe para guardar acesso e enviar Magic Link.

## Configuração

1. Criar o projeto no Supabase.
2. Executar `supabase/schema.sql` no SQL Editor do Supabase.
3. Criar o produto no Stripe:
   - Nome: `Agenda Ativa™ Wedding Planner`
   - Preço: `97€`
   - Pagamento único
4. Configurar o webhook Stripe para:
   - `https://SEU-DOMINIO/api/stripe/webhook`
   - Evento: `checkout.session.completed`
5. Criar `.env.local` a partir de `.env.example`.
6. Publicar na Vercel.

## Variáveis

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

NEXT_PUBLIC_APP_URL=
```

## Lógica Do Dia

```txt
currentDay = min(30, days_since_purchase + 1)
```

Uma compra feita hoje começa sempre no Dia 1.
