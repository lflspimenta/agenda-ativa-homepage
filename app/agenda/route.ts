import { GET as getWedding360 } from "@/app/wedding/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getWedding360(request);
}
