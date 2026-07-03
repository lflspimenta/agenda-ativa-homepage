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

