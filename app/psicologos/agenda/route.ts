import { GET as getPsicologos360 } from "@/app/psicologos/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getPsicologos360(request);
}
