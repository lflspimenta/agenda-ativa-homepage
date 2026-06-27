import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "./pwa-register";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Agenda Ativa™ — Hoje já está tratado.",
  description: "Conteúdo estratégico preparado para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Agenda Ativa", statusBarStyle: "default" },
  icons: { apple: "/aa-monogram-premium.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${cormorant.variable} ${inter.variable}`}>
      <body><PwaRegister />{children}</body>
    </html>
  );
}
