export const commerceEditions = {
  imobiliario: { product: "imobiliario", name: "Imobiliário", agendaPath: "/imobiliario/agenda" },
  fotografos: { product: "fotografos", name: "Fotógrafos", agendaPath: "/fotografos/agenda" },
  "estetica-facial": { product: "estetica_facial", name: "Estética Facial", agendaPath: "/estetica-facial/agenda" },
  "medicina-estetica": { product: "medicina_estetica", name: "Medicina Estética", agendaPath: "/medicina-estetica/agenda" },
  advogados: { product: "advogados", name: "Advogados", agendaPath: "/advogados/agenda" },
  psicologos: { product: "psicologos", name: "Psicólogos", agendaPath: "/psicologos/agenda" },
  cabeleireiros: { product: "cabeleireiros", name: "Cabeleireiros", agendaPath: "/cabeleireiros/agenda" },
  unhas: { product: "unhas", name: "Nails / Unhas", agendaPath: "/unhas/agenda" },
  wedding: { product: "wedding", name: "Wedding Planner", agendaPath: "/agenda" }
} as const;
export type CommerceEditionSlug = keyof typeof commerceEditions;
export const entryPlanAmounts = { 30: 9700, 120: 22700, 360: 39700 } as const;
export type EntryPlanLimit = keyof typeof entryPlanAmounts;
export function getCommerceEdition(slug: string) { return commerceEditions[slug as CommerceEditionSlug] ?? null; }
export function isEntryPlanLimit(value: number): value is EntryPlanLimit { return value === 30 || value === 120 || value === 360; }

export function renderCommercePricing(html: string, slug: CommerceEditionSlug) {
  const edition = commerceEditions[slug];
  const css = `<style>
    .commerce-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px}
    .commerce-plan{border:1px solid var(--line);border-radius:7px;padding:26px 24px;display:flex;flex-direction:column;align-items:flex-start;gap:14px;background:#FFFDF8}
    .commerce-plan.featured{border-color:var(--gold);box-shadow:0 12px 30px rgba(83,67,43,.09)}
    .commerce-plan-name{font-size:12px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:var(--gold)}
    .commerce-plan-count{font-family:Georgia,serif;font-size:28px;line-height:1.1}.commerce-plan-price{font-family:Georgia,serif;font-size:48px;line-height:1}
    .commerce-plan-price small{font-family:Inter,sans-serif;font-size:12px;color:var(--muted)}.commerce-plan p{font-size:13px;line-height:1.5;min-height:40px}.commerce-plan .btn{width:100%;margin-top:auto;text-align:center}
    @media(max-width:980px){.commerce-plans{grid-template-columns:1fr}}
  </style>`;
  const checkout = (limit: 30 | 120 | 360) => `/api/stripe/checkout/${slug}?plano=${limit}`;
  const section = `<section id="preco"><div class="container"><div class="price-box" style="display:block"><div><div class="kicker">Edição ${edition.name}</div><h2>Escolha até onde quer levar a sua presença ativa.</h2><p style="margin-top:16px">Todos os planos são de pagamento único e dão acesso imediato aos conteúdos adquiridos.</p></div><div class="commerce-plans">
    <article class="commerce-plan"><div class="commerce-plan-name">Entrada</div><div class="commerce-plan-count">30 conteúdos</div><div class="commerce-plan-price">97 € <small>pagamento único</small></div><p>Comece com o primeiro bloco da Agenda Ativa™.</p><a class="btn" href="${checkout(30)}">Escolher Entrada</a></article>
    <article class="commerce-plan featured"><div class="commerce-plan-name">Pro</div><div class="commerce-plan-count">120 conteúdos</div><div class="commerce-plan-price">227 € <small>pagamento único</small></div><p>Quatro blocos de conteúdo estratégico prontos a publicar.</p><a class="btn" href="${checkout(120)}">Escolher Pro</a></article>
    <article class="commerce-plan"><div class="commerce-plan-name">Edição Completa</div><div class="commerce-plan-count">360 conteúdos</div><div class="commerce-plan-price">397 € <small>pagamento único</small></div><p>Acesso integral aos 12 blocos desta edição.</p><a class="btn" href="${checkout(360)}">Escolher Edição Completa</a></article>
  </div></div></div></section>`;
  return html
    .replace("</head>", `${css}</head>`)
    .replace(/Ver oferta de lançamento\s*—\s*24,25€/gi, "Ver opções disponíveis")
    .replace(/<section id="preco">[\s\S]*?<\/section>/, section)
    .replace(/<a class="btn" href="[^"]*">Quero a minha edição →<\/a>/g, '<a class="btn" href="#preco">Escolher a minha edição →</a>');
}
