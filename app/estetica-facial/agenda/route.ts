import { GET as getEsteticaFacial360 } from "@/app/estetica-facial/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getEsteticaFacial360(request);
}
