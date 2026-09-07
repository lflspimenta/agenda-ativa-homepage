import { NextResponse } from "next/server";
import { requireFotografosAccess } from "@/lib/fotografos-360-access";
import { getUnlockedFotografosContent } from "@/lib/fotografos-360";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { numero: string } }
) {
  const number = Number(params.numero);
  const { accessLimit, response: accessResponse } = await requireFotografosAccess(request);
  if (accessResponse) return accessResponse;

  const content = getUnlockedFotografosContent(number, accessLimit);
  if (!content) {
    return new NextResponse("Conteúdo ainda não disponível.", {
      status: 403,
      headers: { "Cache-Control": "private, no-store, max-age=0" }
    });
  }

  return NextResponse.json(content, {
    headers: { "Cache-Control": "private, no-store, max-age=0" }
  });
}
