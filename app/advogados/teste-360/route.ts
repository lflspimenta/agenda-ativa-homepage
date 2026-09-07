import contents from "@/private/advogados-360.json";
import { serveEdition360 } from "@/lib/edition-360";
import { advogados360Config } from "@/lib/additional-editions-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return serveEdition360(request, advogados360Config, contents);
}
