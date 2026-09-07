import { NextResponse } from "next/server";
import contents from "@/private/cabeleireiros-360.json";
import {
  getEdition360Content,
  requireEdition360Access
} from "@/lib/edition-360";
import { cabeleireiros360Config } from "@/lib/cabeleireiros-360-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { numero: string } }) {
  const { accessLimit, response } = await requireEdition360Access(request, cabeleireiros360Config);
  if (response) return response;
  const content = getEdition360Content(contents, Number(params.numero), accessLimit);
  if (!content) return new NextResponse("Conteúdo ainda não disponível.", {
    status: 403,
    headers: { "Cache-Control": "private, no-store, max-age=0" }
  });
  return NextResponse.json(content, {
    headers: { "Cache-Control": "private, no-store, max-age=0" }
  });
}
