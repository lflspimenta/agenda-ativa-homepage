import contents from "@/private/unhas-360.json";
import { serveEdition360Content } from "@/lib/edition-360";
import { unhas360Config } from "@/lib/additional-editions-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: { numero: string } }) {
  return serveEdition360Content(request, unhas360Config, contents, Number(params.numero));
}
