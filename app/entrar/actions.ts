"use server";

import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { requiredEnv } from "@/lib/env";

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email) {
    redirect("/entrar?estado=email");
  }

  const admin = createSupabaseAdminClient();
  const { data: userAccess } = await admin
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (!userAccess) {
    redirect("/entrar?estado=sem_acesso");
  }

  const supabase = createClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );

  const redirectTo = `${requiredEnv("NEXT_PUBLIC_APP_URL")}/auth/callback`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo
    }
  });

  if (error) {
    redirect("/entrar?estado=erro");
  }

  redirect("/entrar?estado=enviado");
}
