"use server";

import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { requiredEnv } from "@/lib/env";

const productDestinations = {
  wedding: "/agenda",
  imobiliario: "/imobiliario/agenda",
  fotografos: "/fotografos/agenda",
  estetica_facial: "/estetica-facial/agenda",
  medicina_estetica: "/medicina-estetica/agenda",
  advogados: "/advogados/agenda",
  psicologos: "/psicologos/agenda",
  cabeleireiros: "/cabeleireiros/agenda",
  unhas: "/unhas/agenda"
} as const;

type ProductSlug = keyof typeof productDestinations;

function getProduct(value: FormDataEntryValue | null): ProductSlug {
  const product = String(value || "");
  return product in productDestinations ? (product as ProductSlug) : "wedding";
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const product = getProduct(formData.get("produto"));
  const customerArea = String(formData.get("area") || "") === "1";
  const loginUrl = customerArea
    ? "/entrar?area=1"
    : product === "wedding"
      ? "/entrar"
      : `/entrar?produto=${product}`;

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
    : productDestinations[product];
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
