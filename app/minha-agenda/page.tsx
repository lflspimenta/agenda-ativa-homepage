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
        <a href="/" className="customer-brand">AGENDA ATIVAâ„¢</a>
        <a href="/" className="customer-home">Homepage</a>
      </header>
      <section className="customer-welcome">
        <span>A MINHA AGENDA</span>
        <h1>{access.first_name ? `OlÃ¡, ${access.first_name}.` : "A sua agenda estÃ¡ pronta."}</h1>
        <p>Escolha uma ediÃ§Ã£o e encontre o conteÃºdo de hoje.</p>
      </section>
      <section className="customer-products">
        {products.includes("wedding") && <a className="customer-product wedding-product" href="/agenda"><small>EDIÃ‡ÃƒO</small><h2>Wedding Planner</h2><p>Continuar para o conteÃºdo premium â†’</p></a>}
        {products.includes("imobiliario") && <a className="customer-product imobiliario-product" href="/imobiliario/agenda"><small>EDIÃ‡ÃƒO</small><h2>ImobiliÃ¡rio</h2><p>Continuar para o conteÃºdo premium â†’</p></a>}
        {products.includes("fotografos") && <a className="customer-product fotografos-product" href="/fotografos/agenda"><small>EDIÇÃO</small><h2>Fotógrafos</h2><p>Continuar para o conteúdo premium →</p></a>}
      </section>
      <section className="install-card">
        <span>ACESSO RÃPIDO</span>
        <h2>Tenha a Agenda Ativa no ecrÃ£ inicial.</h2>
        <p>Entre diretamente nas suas ediÃ§Ãµes sem voltar a procurar o email.</p>
        <InstallApp />
      </section>
    </main>
  );
}
