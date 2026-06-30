import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink =
    process.env.NEXT_PUBLIC_STRIPE_PSICOLOGOS_LINK ?? "#";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-psicologos.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace(/\.\.\/imagens\/hero-psicologos\.png/g, "/assets/psicologos/hero-psicologos.png")
    .replace(/\.\.\/imagens\/sobrecarga-psicologos\.png/g, "/assets/psicologos/sobrecarga-psicologos.png")
    .replace(/\.\.\/imagens\/consulta-psicologos\.png/g, "/assets/psicologos/consulta-psicologos.png")
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
