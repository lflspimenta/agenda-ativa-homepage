import { serveImobiliario360 } from "@/lib/imobiliario-360-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveImobiliario360(request);
}
