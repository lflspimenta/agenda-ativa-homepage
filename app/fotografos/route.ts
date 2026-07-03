import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_FOTOGRAFOS_LINK ?? "#";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-fotografos.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(/src="aa-monogram\.svg"/g, 'src="/aa-monogram-official.svg"')
    .replace(/src="hero-fotografos-casamento-v1\.png"/g, 'src="/assets/fotografos/hero-fotografos-casamento-v1.png"')
    .replace(/src="fotografa-cansaco-material\.png"/g, 'src="/assets/fotografos/fotografa-cansaco-material.png"')
    .replace(/src="fotografa-bastidores\.png"/g, 'src="/assets/fotografos/fotografa-bastidores.png"')
    .replace(/src="fotografa-evento-exterior\.png"/g, 'src="/assets/fotografos/fotografa-evento-exterior.png"')
    .replace(/href="#" aria-label=/g, 'href="/" aria-label=')
    .replace(/href="#">Voltar/g, 'href="/">Voltar')
    .replace(/href="#">Quero a Fotógrafos Edition/g, `href="${stripePaymentLink}">Quero a Fotógrafos Edition`)
    .replace(/href="#">Quero a minha edição/g, `href="${stripePaymentLink}">Quero a minha edição`)
    .replace(/O botão de pagamento será ligado depois da aprovação\./g, "Acesso imediato após compra.")
    .replace(/Pré-visualização para aprovação/g, "Acesso digital imediato");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}

