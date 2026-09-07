import contents from "@/private/wedding-360.json";
import { serveEdition360Content } from "@/lib/edition-360";
import { wedding360Config } from "@/lib/wedding-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { numero: string } }) {
  return serveEdition360Content(request, wedding360Config, contents, Number(params.numero));
}
