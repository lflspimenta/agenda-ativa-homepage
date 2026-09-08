import contents from "@/private/medicina-estetica-360.json";
import { serveEdition360 } from "@/lib/edition-360";
import { medicinaEstetica360Config } from "@/lib/medicina-estetica-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveEdition360(request, medicinaEstetica360Config, contents);
}
