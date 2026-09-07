import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";

export const EDITION_360_TOTAL = 360;
export const EDITION_360_BLOCK_SIZE = 30;
export const EDITION_360_DEFAULT_LIMIT = 30;

export type Edition360Content = {
  number: number;
  title: string;
  pilar: string;
  trigger: string;
  format: string;
  objective: string;
  caption: string;
  cta: string;
  expectedResult: string;
};

export type Edition360Config = {
  product: string;
  template: string;
  testLimitEnv: string;
  previewFirstName: string;
  greetingCandidates: string[];
  plainGreeting?: boolean;
};

export function isValidEdition360Limit(limit: number) {
  return Number.isInteger(limit) && limit >= EDITION_360_BLOCK_SIZE &&
    limit <= EDITION_360_TOTAL && limit % EDITION_360_BLOCK_SIZE === 0;
}

export function getEdition360Limit(products: unknown, product: string) {
  if (!Array.isArray(products) || !products.includes(product)) return 0;
  const marker = new RegExp(`^${product.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:(\\d+)$`);
  const limits = products
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.match(marker)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter(isValidEdition360Limit);
  return limits.length ? Math.max(...limits) : EDITION_360_DEFAULT_LIMIT;
}

export async function requireEdition360Access(request: Request, config: Edition360Config) {
  const localPreview = process.env.NODE_ENV === "development" &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (localPreview) {
    const configured = Number(process.env[config.testLimitEnv]);
    return {
      accessLimit: isValidEdition360Limit(configured) ? configured : EDITION_360_DEFAULT_LIMIT,
      firstName: config.previewFirstName,
      response: null
    };
  }

  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.email) {
    return { accessLimit: 0, firstName: null, response: NextResponse.redirect(
      new URL(`/entrar?produto=${config.product}`, request.url)
    ) };
  }

  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("first_name, products")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();
  if (buyerError || !buyer || !Array.isArray(buyer.products) || !buyer.products.includes(config.product)) {
    return { accessLimit: 0, firstName: null, response: NextResponse.redirect(
      new URL(`/entrar?estado=sem_acesso&produto=${config.product}`, request.url)
    ) };
  }

  return {
    accessLimit: getEdition360Limit(buyer.products, config.product),
    firstName: buyer.first_name?.trim() || null,
    response: null
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]!);
}

export async function serveEdition360(
  request: Request,
  config: Edition360Config,
  contents: Edition360Content[]
) {
  if (contents.length !== EDITION_360_TOTAL) {
    throw new Error(`Biblioteca ${config.product} inválida: ${contents.length} conteúdos.`);
  }
  const { accessLimit, firstName, response } = await requireEdition360Access(request, config);
  if (response) return response;

  const template = await readFile(path.join(process.cwd(), "private", config.template), "utf8");
  const unlocked = contents.slice(0, accessLimit).map((content) => ({
    num: content.number,
    format: content.format,
    pilar: content.pilar,
    gatilho: content.trigger,
    objetivo: content.objective,
    title: content.title,
    text: content.caption,
    cta: content.cta,
    resultado: content.expectedResult
  }));
  const greeting = firstName ? `Olá, ${escapeHtml(firstName)}` : "Olá";
  let html = template
    .replace("__UNLOCKED_CONTENTS__", JSON.stringify(unlocked).replace(/</g, "\\u003c"))
    .replace("__ACCESS_LIMIT__", String(accessLimit));
  for (const candidate of config.greetingCandidates) html = html.replace(candidate, greeting);
  if (config.plainGreeting) {
    html = html.replace(
      '<div class="greeting-name">Olá</div>',
      `<div class="greeting-name">${greeting}</div>`
    );
  }
  html = enableEditionContinuationCheckout(html, config.product);

  return new Response(html, { headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store, max-age=0",
    "X-Robots-Tag": "noindex, nofollow"
  } });
}

export function getEdition360Content(contents: Edition360Content[], number: number, accessLimit: number) {
  if (!Number.isInteger(number) || number < 1 || number > accessLimit) return null;
  return contents[number - 1] ?? null;
}

export function enableEditionContinuationCheckout(html: string, product: string) {
  const endpoint = JSON.stringify(`/api/stripe/checkout/${product.replaceAll("_", "-")}/continuacao`);
  return html.replace(
    /button\.setAttribute\("aria-disabled", "true"\);\s*button\.onclick = null;/,
    `button.removeAttribute("aria-disabled");
      button.onclick = async () => {
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = "A preparar checkout…";
        try {
          const response = await fetch(${endpoint}, { method: "POST" });
          const data = await response.json();
          if (!response.ok || !data.url) throw new Error(data.error || "Checkout unavailable");
          window.location.href = data.url;
        } catch (error) {
          button.disabled = false;
          button.textContent = originalText;
          window.alert("Não foi possível abrir o checkout. Tente novamente.");
        }
      };`
  );
}

export async function serveEdition360Content(
  request: Request,
  config: Edition360Config,
  contents: Edition360Content[],
  number: number
) {
  const { accessLimit, response } = await requireEdition360Access(request, config);
  if (response) return response;
  const content = getEdition360Content(contents, number, accessLimit);
  if (!content) return new NextResponse("Conteúdo ainda não disponível.", {
    status: 403,
    headers: { "Cache-Control": "private, no-store, max-age=0" }
  });
  return NextResponse.json(content, {
    headers: { "Cache-Control": "private, no-store, max-age=0" }
  });
}
