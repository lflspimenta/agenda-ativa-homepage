"use server";

import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { requiredEnv } from "@/lib/env";

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const product =
    String(formData.get("produto") || "") === "imobiliario"
      ? "imobiliario"
      : "wedding";
  const customerArea = String(formData.get("area") || "") === "1";
  const loginUrl = customerArea
    ? "/entrar?area=1"
    : product === "imobiliario"
      ? "/entrar?produto=imobiliario"
      : "/entrar";

  if (!email) {
    redirect(`${loginUrl}${loginUrl.includes("?") ? "&" : "?"}estado=email`);
  }

  const admin = createSupabaseAdminClient();
  const { data: userAccess } = await admin
    .from("users")
    .select("email, products")
    .eq("email", email)
    .single();

  if (
    !userAccess ||
    (!customerArea &&
      (!Array.isArray(userAccess.products) ||
        !userAccess.products.includes(product)))
  ) {
    redirect(
      `${loginUrl}${loginUrl.includes("?") ? "&" : "?"}estado=sem_acesso`
    );
  }

  const supabase = createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );

  const destination = customerArea
    ? "/minha-agenda"
    : product === "imobiliario"
      ? "/imobiliario/agenda"
      : "/agenda";
  const redirectTo = `${requiredEnv(
    "NEXT_PUBLIC_APP_URL"
  )}/auth/callback?next=${destination}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo
    }
  });

  if (error) {
    redirect(`${loginUrl}${loginUrl.includes("?") ? "&" : "?"}estado=erro`);
  }

  redirect(`${loginUrl}${loginUrl.includes("?") ? "&" : "?"}estado=enviado`);
}
