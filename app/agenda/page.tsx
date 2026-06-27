import { redirect } from "next/navigation";
import { CopyButton } from "../copy-button";
import { getCurrentDay, getUpcomingDays } from "@/lib/progress";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { DailyContent, UserAccess } from "@/lib/types";

export const dynamic = "force-dynamic";

const fallbackContent: DailyContent = {
  id: 1,
  day: 1,
  title: "3 erros que os noivos cometem ao escolher o venue.",
  body: [
    "Escolher o venue certo influencia toda a experiência do casamento: o conforto dos convidados, a logística, a fotografia e até o ritmo do dia.",
    "Antes de decidir, os noivos devem confirmar três pontos essenciais: capacidade real do espaço, plano B em caso de chuva e liberdade para personalizar fornecedores.",
    "A melhor escolha é aquela que permite viver o dia com tranquilidade, sem decisões de última hora."
  ].join("\n\n"),
  cta: "Guarde este post para quando começar a visitar espaços para o casamento."
};

export default async function ProductPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/entrar");
  }

  const { data: access } = await supabase
    .from("users")
    .select("id,email,first_name,purchase_date,created_at")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  const userAccess = access as UserAccess | null;

  if (!userAccess?.purchase_date) {
    redirect("/entrar?estado=sem_acesso");
  }

  const currentDay = getCurrentDay(userAccess.purchase_date);
  const { data: content } = await supabase
    .from("content")
    .select("id,day,title,body,cta")
    .eq("day", currentDay)
    .maybeSingle();

  const dailyContent = (content as DailyContent | null) || fallbackContent;
  const upcomingDays = getUpcomingDays(currentDay);
  const firstName = userAccess.first_name?.trim();

  return (
    <main className="page product-page">
      <header className="product-brand">
        <div className="brand">AGENDA ATIVA™</div>
        <div className="edition">Wedding Planner Edition</div>
      </header>

      <section className="hero-message" aria-label="Mensagem principal">
        {firstName ? <p>Olá {firstName},</p> : null}
        <h1>Hoje já está tratado.</h1>
      </section>

      <div className="product-promise">
        Volte aos noivos.
        <br />
        Nós tratamos do Instagram.
      </div>

      <section className="daily-meta" aria-label="Resumo do dia">
        <div className="daily-time">⏱ 3 min</div>
        <div className="daily-day">
          <span>Dia {currentDay}</span>
          de 30
        </div>
      </section>

      <section className="agenda" aria-label="Agenda do dia">
        <article className="today experience-card">
          <div className="product-kicker">Conteúdo de hoje</div>
          <h2 className="post-title">{dailyContent.title}</h2>

          <div className="proof-list" aria-label="Incluído hoje">
            <div><span>✓</span> Conteúdo preparado</div>
            <div><span>✓</span> Legenda pronta</div>
            <div><span>✓</span> CTA incluída</div>
          </div>

          <CopyButton title={dailyContent.title} body={dailyContent.body} cta={dailyContent.cta} />

          <details className="content-details">
            <summary>Ver conteúdo completo</summary>
            <div className="details-panel">
              <div className="section-label">Legenda pronta</div>
              <div className="copy-block">
                {dailyContent.body.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="section-label">CTA</div>
              <div className="cta-copy">{dailyContent.cta}</div>
            </div>
          </details>
        </article>

        <aside className="upcoming product-upcoming" aria-label="Próximos dias">
          {upcomingDays.map((item) => (
            <div className="locked-day" key={item.day}>
              <div>
                <strong>Dia {item.day}</strong>
                <span>{item.label}</span>
              </div>
              <svg className="lock-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6.5" y="10" width="11" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8.5 10V7.8C8.5 5.7 10 4.2 12 4.2s3.5 1.5 3.5 3.6V10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </aside>
      </section>
    </main>
  );
}
