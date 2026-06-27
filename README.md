# Agenda Ativa — Aplicação Principal

Esta é a pasta oficial para desenvolvimento e publicação da Agenda Ativa.
As pastas originais das edições permanecem intactas como cópias de segurança.

## Rotas

- `/` — homepage com as edições disponíveis
- `/wedding` — landing page Wedding Planner
- `/agenda` — conteúdo premium Wedding Planner
- `/imobiliario` — landing page Imobiliário
- `/imobiliario/agenda` — conteúdo premium Imobiliário
- `/entrar` — entrada de clientes Wedding
- `/entrar?produto=imobiliario` — entrada de clientes Imobiliário

## Serviços partilhados

Toda a aplicação utiliza:

- um projeto Vercel;
- um repositório GitHub;
- um projeto Supabase;
- uma conta Stripe e um webhook;
- um Payment Link por edição.

## Configuração

1. Criar `.env.local` com base em `.env.example`.
2. Executar `supabase/schema.sql` num projeto Supabase novo.
3. Executar `supabase/migrations/002_imobiliario.sql`.
4. Criar o Payment Link do Imobiliário no Stripe.
5. Adicionar ao Payment Link o metadado `product=imobiliario`.
6. Guardar o link em `NEXT_PUBLIC_STRIPE_IMOBILIARIO_LINK`.
7. Publicar esta pasta na Vercel.

## Conteúdo premium

Os ficheiros finais ficam em `private/` e só são devolvidos depois de:

1. confirmar a sessão do utilizador;
2. encontrar o email na tabela `users`;
3. confirmar que `products` contém a edição pedida.

Não colocar os ficheiros premium em `public/`.
