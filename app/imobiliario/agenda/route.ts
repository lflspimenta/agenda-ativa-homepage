import { GET as getImobiliario360 } from "@/app/imobiliario/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getImobiliario360(request);
}
