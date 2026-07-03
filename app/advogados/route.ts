import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink =
    process.env.NEXT_PUBLIC_STRIPE_ADVOGADOS_LINK ?? "#";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-advogados.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace(/\.\.\/imagens\/2\.png/g, "/assets/advogados/2.png")
    .replace(/\.\.\/imagens\/3\.png/g, "/assets/advogados/3.png")
    .replace(/\.\.\/imagens\/4\.png/g, "/assets/advogados/4.png")
    .replace(
      /href="#">Quero a minha edição/g,
      `href="${stripePaymentLink}">Quero a minha edição`
    );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
