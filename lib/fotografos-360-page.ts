import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requireFotografosAccess } from "@/lib/fotografos-360-access";
import { getUnlockedFotografosContents } from "@/lib/fotografos-360";
import { enableEditionContinuationCheckout } from "@/lib/edition-360";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]!);
}

export async function serveFotografos360(request: Request) {
  const { accessLimit, firstName, response } = await requireFotografosAccess(request);
  if (response) return response;
  const template = await readFile(
    path.join(process.cwd(), "private", "agenda-fotografos-360.html"),
    "utf8"
  );
  const unlocked = getUnlockedFotografosContents(accessLimit).map((content) => ({
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
    .replace("__ACCESS_LIMIT__", String(accessLimit))
    .replace("Olá, Sofia", greeting)
    .replace("Olá, Luís", greeting);
  html = enableEditionContinuationCheckout(html, "fotografos");
  return new Response(html, { headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store, max-age=0",
    "X-Robots-Tag": "noindex, nofollow"
  } });
}
