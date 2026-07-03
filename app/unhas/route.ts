import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink =
    process.env.NEXT_PUBLIC_STRIPE_UNHAS_LINK ??
    "https://buy.stripe.com/14A6oHb6H9XT7D577YdjO05";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-unhas.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(/url\("\.\.\/imagens\/1\.png"\)/g, 'url("/assets/unhas/1.png")')
    .replace(/url\("\.\.\/imagens\/2\.png"\)/g, 'url("/assets/unhas/2.png")')
    .replace(/url\("\.\.\/imagens\/3\.png"\)/g, 'url("/assets/unhas/3.png")')
    .replace(/src="\.\.\/imagens\/1\.png"/g, 'src="/assets/unhas/1.png"')
    .replace(/src="\.\.\/imagens\/2\.png"/g, 'src="/assets/unhas/2.png"')
    .replace(/src="\.\.\/imagens\/3\.png"/g, 'src="/assets/unhas/3.png"')
    .replace(/href="#" aria-label=/g, 'href="/" aria-label=')
    .replace(/href="#">Quero a minha edição/g, `href="${stripePaymentLink}">Quero a minha edição`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
