import { GET as getCabeleireiros360 } from "@/app/cabeleireiros/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getCabeleireiros360(request);
}
