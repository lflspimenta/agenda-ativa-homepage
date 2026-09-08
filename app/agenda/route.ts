import contents from "@/private/wedding-360.json";
import { serveEdition360 } from "@/lib/edition-360";
import { wedding360Config } from "@/lib/wedding-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveEdition360(request, wedding360Config, contents);
}
