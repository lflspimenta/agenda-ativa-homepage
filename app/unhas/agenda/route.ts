import { GET as getUnhas360 } from "@/app/unhas/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getUnhas360(request);
}
