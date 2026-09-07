import contents from "@/private/cabeleireiros-360.json";
import { serveEdition360 } from "@/lib/edition-360";
import { cabeleireiros360Config } from "@/lib/cabeleireiros-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveEdition360(request, cabeleireiros360Config, contents);
}
