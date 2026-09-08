import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderCommercePricing } from "@/lib/commerce-editions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-psicologos.html"),
    "utf8"
  );

  let html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(/\.\.\/imagens\/hero-psicologos\.png/g, "/assets/psicologos/hero-psicologos.png")
    .replace(/\.\.\/imagens\/sobrecarga-psicologos\.png/g, "/assets/psicologos/sobrecarga-psicologos.png")
    .replace(/\.\.\/imagens\/consulta-psicologos\.png/g, "/assets/psicologos/consulta-psicologos.png");

  html = renderCommercePricing(html, "psicologos");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
