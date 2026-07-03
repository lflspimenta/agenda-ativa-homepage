import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_ESTETICA_FACIAL_LINK ?? "#";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-estetica-facial.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace("</head>", '<style>@media(max-width:640px){.middle-band h2,.objection h2,.content-card h2,.panel h2,.focus-box h2,.image-copy h2,.price-box h2{font-size:32px;line-height:1.08}.preview h3{font-size:24px}.footer-cta h2{font-size:34px}}</style></head>')
    .replace(/src="aa-monogram\.svg"/g, 'src="/aa-monogram-official.svg"')
    .replace(/src="imagens\/1\.png"/g, 'src="/assets/estetica-facial/1.png"')
    .replace(/src="imagens\/2\.png"/g, 'src="/assets/estetica-facial/2.png"')
    .replace(/src="imagens\/3\.png"/g, 'src="/assets/estetica-facial/3.png"')
    .replace(/src="imagens\/4\.png"/g, 'src="/assets/estetica-facial/4.png"')
    .replace(/href="#" aria-label=/g, 'href="/" aria-label=')
    .replace(/href="#">Voltar/g, 'href="/">Voltar')
    .replace(/href="#">Quero a Estética Facial Edition/g, `href="${stripePaymentLink}">Quero a Estética Facial Edition`)
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
