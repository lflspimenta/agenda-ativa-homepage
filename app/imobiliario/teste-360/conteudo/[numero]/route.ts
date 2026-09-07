import { NextResponse } from "next/server";
import { requireImobiliarioAccess } from "@/lib/imobiliario-360-access";
import {
  CONTENTS_PER_CYCLE,
  getCycleForContent,
  isContentUnlocked,
  TOTAL_CONTENTS
} from "@/lib/imobiliario-360";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { numero: string } }) {
  const number = Number(params.numero);
  if (!Number.isInteger(number) || number < 1 || number > TOTAL_CONTENTS) {
    return new Response("Conteúdo não encontrado.", { status: 404 });
  }

  const { accessLimit, response: accessResponse } = await requireImobiliarioAccess(request);
  if (accessResponse) return accessResponse;

  if (isContentUnlocked(number, accessLimit)) {
    return NextResponse.redirect(
      new URL(`/imobiliario/teste-360?dia=${number}`, request.url)
    );
  }

  const cycle = getCycleForContent(number);
  const start = (cycle - 1) * CONTENTS_PER_CYCLE + 1;
  const end = cycle * CONTENTS_PER_CYCLE;
  const html = `<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Agenda Ativa™ — Imobiliário</title><style>:root{--paper:#F8F7F4;--surface:#fffefb;--ink:#1F313B;--muted:#6F7A78;--rose:#2F4B59;--line:rgba(47,75,89,.14);--serif:"Cormorant Garamond",Georgia,serif;--sans:"Inter",system-ui,sans-serif}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--sans);display:grid;place-items:center}.nav{position:fixed;inset:0 0 auto;padding:16px 20px;border-bottom:1px solid var(--line);background:rgba(250,247,243,.97);font-family:var(--serif);font-size:26px}.nav sup{font-size:10px;color:var(--rose)}main{width:min(440px,calc(100% - 40px));padding:34px 28px;border:1px solid var(--line);border-top:3px solid var(--rose);border-radius:6px;background:var(--surface);box-shadow:0 24px 56px rgba(31,49,59,.10);text-align:center}.eyebrow{color:var(--rose);font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}h1{margin:14px 0 10px;font-family:var(--serif);font-size:34px;font-weight:400}p{color:var(--muted);font-size:13px;line-height:1.65}a{display:inline-block;margin-top:18px;color:var(--rose);font-size:11px;font-weight:600;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}</style></head><body><nav class="nav">Agenda Ativa<sup>™</sup></nav><main><div class="eyebrow">Conteúdo bloqueado</div><h1>Conteúdos ${start}–${end}</h1><p>Conteúdos ainda não disponíveis.</p><a href="/imobiliario/teste-360?dia=30">← Voltar à agenda</a></main></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
