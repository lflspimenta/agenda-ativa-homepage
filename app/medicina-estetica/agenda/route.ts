import { GET as getMedicinaEstetica360 } from "@/app/medicina-estetica/teste-360/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return getMedicinaEstetica360(request);
}
