import { serveFotografos360 } from "@/lib/fotografos-360-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveFotografos360(request);
}
