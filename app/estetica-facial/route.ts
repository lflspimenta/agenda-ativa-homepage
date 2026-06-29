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
    .replace(/src="aa-monogram\.svg"/g, 'src="/aa-monogram-official.svg"')
    .replace(/src="imagens\/1\.png"/g, 'src="/assets/estetica-facial/1.png"')
    .replace(/src="imagens\/2\.png"/g, 'src="/assets/estetica-facial/2.png"')
    .replace(/src="imagens\/3\.png"/g, 'src="/assets/estetica-facial/3.png"')
    .replace(/src="imagens\/4\.png"/g, 'src="/assets/estetica-facial/4.png"')
    .replace(/href="#">Voltar/g, 'href="/">Voltar')
    .replace(/href="#">Quero a Estética Facial Edition/g, `href="${stripePaymentLink}">Quero a Estética Facial Edition`)
    .replace(/O botão de pagamento será ligado depois da aprovação\./g, "Acesso imediato após compra.")
    .replace(/Pré-visualização para aprovação/g, "Acesso digital imediato");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}