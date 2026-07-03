import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink =
    process.env.NEXT_PUBLIC_STRIPE_MEDICINA_ESTETICA_LINK ?? "#";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-medicina-estetica.html"),
    "utf8"
  );

  const html = htmlTemplate
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
    .replace(/href="\/" aria-label=/g, 'href="/" aria-label=')
    .replace(/href="#preco">Quero a minha edição/g, `href="#preco">Quero a minha edição`)
    .replace(/href="#">Quero a minha edição/g, `href="${stripePaymentLink}">Quero a minha edição`)
    .replace(/href="#">Quero a minha edição →/g, `href="${stripePaymentLink}">Quero a minha edição →`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
