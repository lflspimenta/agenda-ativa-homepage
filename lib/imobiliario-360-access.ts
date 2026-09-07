import "server-only";
import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";
import {
  DEFAULT_ACCESS_LIMIT,
  getAccessLimit,
  isValidAccessLimit
} from "@/lib/imobiliario-360";

export async function requireImobiliarioAccess(request: Request) {
  const localPreview =
    process.env.NODE_ENV === "development" &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (localPreview) {
    const configuredLimit = Number(process.env.IMOBILIARIO_360_TEST_LIMIT);
    return {
      accessLimit: isValidAccessLimit(configuredLimit)
        ? configuredLimit
        : DEFAULT_ACCESS_LIMIT,
      firstName: "Luís",
      response: null
    };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return {
      accessLimit: 0,
      firstName: null,
      response: NextResponse.redirect(new URL("/entrar?produto=imobiliario", request.url))
    };
  }

  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("first_name, products")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (
    buyerError ||
    !buyer ||
    !Array.isArray(buyer.products) ||
    !buyer.products.includes("imobiliario")
  ) {
    return {
      accessLimit: 0,
      firstName: null,
      response: NextResponse.redirect(
        new URL("/entrar?estado=sem_acesso&produto=imobiliario", request.url)
      )
    };
  }

  return {
    accessLimit: getAccessLimit(buyer.products),
    firstName: buyer.first_name?.trim() || null,
    response: null
  };
}
