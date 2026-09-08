import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderCommercePricing } from "@/lib/commerce-editions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-advogados.html"),
    "utf8"
  );

  let html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(/\.\.\/imagens\/2\.png/g, "/assets/advogados/2.png")
    .replace(/\.\.\/imagens\/3\.png/g, "/assets/advogados/3.png")
    .replace(/\.\.\/imagens\/4\.png/g, "/assets/advogados/4.png");

  html = renderCommercePricing(html, "advogados");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
