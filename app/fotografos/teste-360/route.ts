import { readFile } from "node:fs/promises";
import path from "node:path";
import { requireFotografosAccess } from "@/lib/fotografos-360-access";
import { getUnlockedFotografosContents } from "@/lib/fotografos-360";
import { enableEditionContinuationCheckout } from "@/lib/edition-360";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]!);
}

export async function GET(request: Request) {
  const { accessLimit, firstName, response: accessResponse } = await requireFotografosAccess(request);
  if (accessResponse) return accessResponse;

  const template = await readFile(
    path.join(process.cwd(), "private", "agenda-fotografos-360-teste.html"),
    "utf8"
  );
  const unlockedContents = getUnlockedFotografosContents(accessLimit).map((content) => ({
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
  const serialized = JSON.stringify(unlockedContents).replace(/</g, "\\u003c");
  const greeting = firstName ? `Olá, ${escapeHtml(firstName)}` : "Olá";
  let html = template
    .replace("__UNLOCKED_CONTENTS__", serialized)
    .replace("__ACCESS_LIMIT__", String(accessLimit))
    .replace("Olá, Sofia", greeting)
    .replace("Olá, Luís", greeting);
  html = enableEditionContinuationCheckout(html, "fotografos");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
