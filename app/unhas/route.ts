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
