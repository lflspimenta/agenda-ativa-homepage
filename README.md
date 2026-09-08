# Agenda Ativa — Aplicação Principal

Aplicação comercial e área privada da Agenda Ativa™, publicada em `agendaativa.org`.

## Produto

A aplicação contém nove edições, com 360 conteúdos editoriais em cada edição:

- Wedding Planner (`wedding`)
- Imobiliário (`imobiliario`)
- Fotógrafos (`fotografos`)
- Estética Facial (`estetica_facial`)
- Medicina Estética (`medicina_estetica`)
- Advogados (`advogados`)
- Psicólogos (`psicologos`)
- Cabeleireiros (`cabeleireiros`)
- Nails / Unhas (`unhas`)

## Rotas principais

| Edição | Landing | Área privada |
| --- | --- | --- |
| Wedding Planner | `/wedding` | `/agenda` |
| Imobiliário | `/imobiliario` | `/imobiliario/agenda` |
| Fotógrafos | `/fotografos` | `/fotografos/agenda` |
| Estética Facial | `/estetica-facial` | `/estetica-facial/agenda` |
| Medicina Estética | `/medicina-estetica` | `/medicina-estetica/agenda` |
| Advogados | `/advogados` | `/advogados/agenda` |
| Psicólogos | `/psicologos` | `/psicologos/agenda` |
| Cabeleireiros | `/cabeleireiros` | `/cabeleireiros/agenda` |
| Nails / Unhas | `/unhas` | `/unhas/agenda` |

Outras rotas relevantes:

- `/` — homepage
- `/entrar` — pedido de link de acesso
- `/minha-agenda` — edições adquiridas pelo utilizador
- `/auth/callback` — conclusão da autenticação Supabase
- `/api/stripe/webhook` — confirmação de compras Stripe

Não existem rotas públicas de teste. Os templates e conteúdos premium ficam em `private/`.

## Acesso aos conteúdos

O acesso é guardado no campo `public.users.products` (`text[]`). O marcador base mantém compatibilidade com utilizadores antigos e o marcador numérico determina o limite adquirido:

```text
imobiliario
imobiliario:120
```

São válidos todos os múltiplos de 30 entre 30 e 360. Se existirem vários marcadores para a mesma edição, o servidor utiliza o maior limite válido. Um utilizador com apenas o marcador base recebe 30 conteúdos.

O limite é calculado exclusivamente no servidor. Apenas os conteúdos até esse limite são incluídos no HTML enviado ao browser; pedidos acima do limite recebem resposta de acesso recusado.

## Comércio

Planos iniciais por edição:

- 30 conteúdos — 97 €
- 120 conteúdos — 227 €
- 360 conteúdos — 397 €

A continuação acrescenta 30 conteúdos por 67 €, até ao máximo de 360. Os preços são definidos no servidor. O checkout cria uma sessão Stripe com `product`, `purchase_type` e `target_limit` nos metadados. O webhook valida o evento e atualiza o maior limite adquirido sem reduzir acessos existentes.

## Serviços

- Vercel — aplicação e variáveis de ambiente
- GitHub — código-fonte e histórico
- Supabase — autenticação e tabela `public.users`
- Stripe — checkout e webhook
- Resend — aviso de venda por email, quando configurado

## Desenvolvimento

1. Copiar `.env.example` para `.env.local` e preencher apenas localmente.
2. Instalar dependências com `npm install`.
3. Iniciar com `npm run dev`.
4. Validar produção com `npm run build`.

Nunca versionar `.env.local`, chaves privadas ou exportações de clientes.

## Variáveis obrigatórias

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

Para deployments Preview com Stripe em modo de teste:

- `STRIPE_TEST_SECRET_KEY`
- `STRIPE_TEST_WEBHOOK_SECRET`

O email de aviso de venda requer `RESEND_API_KEY`, `SALES_NOTIFICATION_EMAIL` e `SALES_NOTIFICATION_FROM`.

## Publicação

A branch `main` é a origem da produção. Antes de publicar:

1. confirmar que `git status` está limpo;
2. executar `npm run build`;
3. confirmar as nove bibliotecas com 360 conteúdos;
4. testar autenticação, checkout e webhook em Preview;
5. promover para `main` e verificar o deployment da Vercel.
