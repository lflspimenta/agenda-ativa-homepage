"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const productDestinations: Record<string, string> = {
  wedding: "/agenda",
  imobiliario: "/imobiliario/agenda",
  fotografos: "/fotografos/agenda",
  estetica_facial: "/estetica-facial/agenda",
  medicina_estetica: "/medicina-estetica/agenda",
  advogados: "/advogados/agenda",
  psicologos: "/psicologos/agenda",
  cabeleireiros: "/cabeleireiros/agenda",
  unhas: "/unhas/agenda"
};

function getFallbackDestination(search: string) {
  const params = new URLSearchParams(search);

  if (params.get("area") === "1") {
    return "/minha-agenda";
  }

  const product = params.get("produto") || "wedding";
  return productDestinations[product] || "/agenda";
}

export function LoginSessionHandler() {
  useEffect(() => {
    async function handleMagicLinkHash() {
      const search = window.location.search;

      if (search.includes("code=") || search.includes("token_hash=")) {
        window.location.replace(`/auth/callback${search}`);
        return;
      }

      const hash = window.location.hash;

      if (!hash || !hash.includes("access_token")) {
        return;
      }

      const params = new URLSearchParams(hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        window.location.replace("/entrar?estado=erro");
        return;
      }

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });

      if (error) {
        window.location.replace("/entrar?estado=erro");
        return;
      }

      const destination =
        new URLSearchParams(window.location.search).get("next") ||
        getFallbackDestination(window.location.search);
      window.history.replaceState(null, "", "/entrar");
      window.location.replace(destination);
    }

    handleMagicLinkHash();
  }, []);

  return null;
}

export function hasMagicLinkHash() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.hash.includes("access_token");
}
