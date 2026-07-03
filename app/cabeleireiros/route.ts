import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stripePaymentLink =
    process.env.NEXT_PUBLIC_STRIPE_CABELEIREIROS_LINK ??
    "https://buy.stripe.com/14AcN52AbgmhaPh9g6djO04";
  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "landing-cabeleireiros.html"),
    "utf8"
  );

  const html = htmlTemplate
    .replace('<nav class="nav-links">', '<nav class="nav-links"><a href="/">Homepage</a>')
    .replace(/url\("\.\.\/imagens\/1\.png"\)/g, 'url("/assets/cabeleireiros/1.png")')
    .replace(/url\("\.\.\/imagens\/2\.png"\)/g, 'url("/assets/cabeleireiros/2.png")')
    .replace(/src="\.\.\/imagens\/1\.png"/g, 'src="/assets/cabeleireiros/1.png"')
    .replace(/src="\.\.\/imagens\/2\.png"/g, 'src="/assets/cabeleireiros/2.png"')
    .replace(/href="#" aria-label=/g, 'href="/" aria-label=')
    .replace(/https:\/\/buy\.stripe\.com\/14AcN52AbgmhaPh9g6djO04/g, stripePaymentLink)
    .replace(/href="#">Quero a minha edição/g, `href="${stripePaymentLink}">Quero a minha edição`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
