import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderCommercePricing } from "@/lib/commerce-editions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-medicina-estetica.html"),
    "utf8"
  );

  let html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(
      /url\("\.\.\/imagens\/hero-medicina-estetica\.png"\)/g,
      'url("/assets/medicina-estetica/hero-medicina-estetica.png")'
    )
    .replace(
      /url\("\.\.\/imagens\/dor-medicina-estetica\.png"\)/g,
      'url("/assets/medicina-estetica/dor-medicina-estetica.png")'
    )
    .replace(
      /url\("\.\.\/imagens\/tratamento-medicina-estetica\.png"\)/g,
      'url("/assets/medicina-estetica/tratamento-medicina-estetica.png")'
    )
    .replace(
      /url\("\.\.\/imagens\/consulta-medicina-estetica\.png"\)/g,
      'url("/assets/medicina-estetica/consulta-medicina-estetica.png")'
    )
    .replace(
      /src="\.\.\/imagens\/hero-medicina-estetica\.png"/g,
      'src="/assets/medicina-estetica/hero-medicina-estetica.png"'
    )
    .replace(
      /src="\.\.\/imagens\/dor-medicina-estetica\.png"/g,
      'src="/assets/medicina-estetica/dor-medicina-estetica.png"'
    )
    .replace(
      /src="\.\.\/imagens\/tratamento-medicina-estetica\.png"/g,
      'src="/assets/medicina-estetica/tratamento-medicina-estetica.png"'
    )
    .replace(
      /src="\.\.\/imagens\/consulta-medicina-estetica\.png"/g,
      'src="/assets/medicina-estetica/consulta-medicina-estetica.png"'
    )
    .replace(/href="\/" aria-label=/g, 'href="/" aria-label=');

  html = renderCommercePricing(html, "medicina-estetica");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
