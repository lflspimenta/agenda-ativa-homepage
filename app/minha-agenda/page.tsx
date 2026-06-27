import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase-server";
import { InstallApp } from "./install-app";

export const dynamic = "force-dynamic";

export default async function MinhaAgendaPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect("/entrar?area=1");

  const admin = createSupabaseAdminClient();
  const { data: access } = await admin.from("users")
    .select("first_name, products").eq("email", user.email.toLowerCase()).maybeSingle();
  const products: string[] = Array.isArray(access?.products) ? access.products : [];
  if (!access || products.length === 0) redirect("/entrar?area=1&estado=sem_acesso");

  return (
    <main className="customer-area">
      <header className="customer-header">
        <a href="/" className="customer-brand">AGENDA ATIVA™</a>
        <a href="/" className="customer-home">Homepage</a>
      </header>
      <section className="customer-welcome">
        <span>A MINHA AGENDA</span>
        <h1>{access.first_name ? `Olá, ${access.first_name}.` : "A sua agenda está pronta."}</h1>
        <p>Escolha uma edição e encontre o conteúdo de hoje.</p>
      </section>
      <section className="customer-products">
        {products.includes("wedding") && <a className="customer-product wedding-product" href="/agenda"><small>EDIÇÃO</small><h2>Wedding Planner</h2><p>Continuar para o conteúdo premium →</p></a>}
        {products.includes("imobiliario") && <a className="customer-product imobiliario-product" href="/imobiliario/agenda"><small>EDIÇÃO</small><h2>Imobiliário</h2><p>Continuar para o conteúdo premium →</p></a>}
      </section>
      <section className="install-card">
        <span>ACESSO RÁPIDO</span>
        <h2>Tenha a Agenda Ativa no ecrã inicial.</h2>
        <p>Entre diretamente nas suas edições sem voltar a procurar o email.</p>
        <InstallApp />
      </section>
    </main>
  );
}
