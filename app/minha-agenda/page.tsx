import { redirect } from "next/navigation";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";
import { InstallApp } from "./install-app";

export const dynamic = "force-dynamic";

const labels = {
  brand: "AGENDA ATIVA\u2122",
  ready: "A sua agenda est\u00e1 pronta.",
  hello: "Ol\u00e1",
  choose: "Escolha uma edi\u00e7\u00e3o e encontre o conte\u00fado de hoje.",
  edition: "EDI\u00c7\u00c3O",
  premium: "Continuar para o conte\u00fado premium \u2192",
  imobiliario: "Imobili\u00e1rio",
  fotografos: "Fot\u00f3grafos",
  esteticaFacial: "Est\u00e9tica Facial",
  medicinaEstetica: "Medicina Est\u00e9tica",
  cabeleireiros: "Cabeleireiros",
  unhas: "Nails / Unhas",
  quick: "ACESSO R\u00c1PIDO",
  installTitle: "Tenha a Agenda Ativa no ecr\u00e3 inicial.",
  installText: "Entre diretamente nas suas edi\u00e7\u00f5es sem voltar a procurar o email."
};

export default async function MinhaAgendaPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/entrar?area=1");

  const admin = createSupabaseAdminClient();
  const { data: access } = await admin
    .from("users")
    .select("first_name, products")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  const products: string[] = Array.isArray(access?.products)
    ? access.products
    : [];

  if (!access || products.length === 0) {
    redirect("/entrar?area=1&estado=sem_acesso");
  }

  return (
    <main className="customer-area">
      <header className="customer-header">
        <a href="/" className="customer-brand">{labels.brand}</a>
        <a href="/" className="customer-home">Homepage</a>
      </header>

      <section className="customer-welcome">
        <span>A MINHA AGENDA</span>
        <h1>
          {access.first_name
            ? `${labels.hello}, ${access.first_name}.`
            : labels.ready}
        </h1>
        <p>{labels.choose}</p>
      </section>

      <section className="customer-products">
        {products.includes("wedding") && (
          <a className="customer-product wedding-product" href="/agenda">
            <small>{labels.edition}</small>
            <h2>Wedding Planner</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("imobiliario") && (
          <a className="customer-product imobiliario-product" href="/imobiliario/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.imobiliario}</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("fotografos") && (
          <a className="customer-product fotografos-product" href="/fotografos/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.fotografos}</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("estetica_facial") && (
          <a className="customer-product estetica-facial-product" href="/estetica-facial/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.esteticaFacial}</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("medicina_estetica") && (
          <a className="customer-product medicina-estetica-product" href="/medicina-estetica/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.medicinaEstetica}</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("cabeleireiros") && (
          <a className="customer-product cabeleireiros-product" href="/cabeleireiros/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.cabeleireiros}</h2>
            <p>{labels.premium}</p>
          </a>
        )}

        {products.includes("unhas") && (
          <a className="customer-product unhas-product" href="/unhas/agenda">
            <small>{labels.edition}</small>
            <h2>{labels.unhas}</h2>
            <p>{labels.premium}</p>
          </a>
        )}
      </section>

      <section className="install-card">
        <span>{labels.quick}</span>
        <h2>{labels.installTitle}</h2>
        <p>{labels.installText}</p>
        <InstallApp />
      </section>
    </main>
  );
}
