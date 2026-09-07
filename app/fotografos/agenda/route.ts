import { GET as getFotografos360 } from "@/app/fotografos/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getFotografos360(request);
}
