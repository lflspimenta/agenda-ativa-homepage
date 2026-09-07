import { GET as getAdvogados360 } from "@/app/advogados/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getAdvogados360(request);
}
