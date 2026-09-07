import contents from "@/private/psicologos-360.json";
import { serveEdition360Content } from "@/lib/edition-360";
import { psicologos360Config } from "@/lib/additional-editions-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: { numero: string } }) {
  return serveEdition360Content(request, psicologos360Config, contents, Number(params.numero));
}
