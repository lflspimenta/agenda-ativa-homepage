import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  { name: "Wedding Edition", status: "Disponível", href: "/wedding", available: true },
  { name: "Estética Edition", status: "Brevemente", available: false },
  { name: "Imobiliário Edition", status: "Brevemente", available: false },
  { name: "Advogados Edition", status: "Brevemente", available: false },
  { name: "Fotógrafos Edition", status: "Brevemente", available: false }
];

const benefits = [
  "30 dias de conteúdo",
  "Legendas preparadas",
  "CTA incluída",
  "Estratégia definida",
  "Menos de 5 minutos por dia",
  "Acesso imediato"
];

const professionals = [
  "Wedding Planners",
  "Profissionais de Estética",
  "Consultores Imobiliários",
  "Advogados",
  "Fotógrafos"
];

const faqs = [
  ["O que é a Agenda Ativa™?", "É uma biblioteca de edições especializadas com 30 dias de conteúdo estratégico, preparado para adaptar e publicar."],
  ["Preciso de usar IA ou escrever prompts?", "Não. Todo o conteúdo chega preparado. Não existem prompts, configurações ou folhas em branco."],
  ["Como recebo o acesso?", "O acesso à edição disponível é enviado imediatamente após a confirmação da compra."],
  ["Posso adaptar o conteúdo à minha marca?", "Sim. A estrutura, a legenda e a estratégia estão definidas, mas pode ajustar o tom e usar as suas próprias imagens."],
  ["Vão existir novas edições?", "Sim. A Agenda Ativa™ continuará a crescer com edições dedicadas a diferentes áreas profissionais."]
];

export default function HomePage() {
  return (
    <main className="brand-home">
      <LoginSessionHandler />
      <nav className="brand-nav" aria-label="Navegação principal">
        <a className="brand-wordmark" href="#inicio" aria-label="Agenda Ativa, início">AGENDA ATIVA<sup>™</sup></a>
        <div className="brand-nav-links"><a href="#como-funciona">Como funciona</a><a href="#edicoes">Edições</a><a href="#faq">FAQ</a></div>
        <a className="brand-nav-cta" href="#edicoes">Explorar edições</a>
      </nav>

      <section className="brand-hero" id="inicio">
        <div className="brand-hero-copy">
          <p className="brand-eyebrow">Menos tempo a criar. Mais tempo para trabalhar.</p>
          <h1>A forma mais simples de manter a sua comunicação ativa, mesmo quando a sua agenda está cheia.</h1>
          <p className="brand-lead">Conteúdo estratégico preparado para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.</p>
          <div className="brand-actions">
            <a className="brand-button brand-button-primary" href="#edicoes">Explorar edições</a>
            <a className="brand-button brand-button-text" href="#como-funciona">Ver como funciona <span>↓</span></a>
          </div>
        </div>
        <div className="brand-hero-mark" aria-hidden="true">
          <img src="/aa-monogram-official.svg" alt="" />
          <p>Hoje já está tratado.</p>
        </div>
      </section>

      <section className="aa-about brand-shell" aria-labelledby="about-title">
        <div className="aa-about-copy">
          <p className="brand-kicker">Agenda Ativa™</p>
          <h2 id="about-title">O que é a Agenda Ativa<sup>™</sup>?</h2>
          <p>A Agenda Ativa™ é uma biblioteca de edições especializadas para profissionais que precisam de comunicar com consistência, mas não têm tempo para criar conteúdo todos os dias.</p>
          <p>Cada edição inclui 30 dias de conteúdo estratégico, pronto a adaptar e publicar.</p>
          <div className="aa-short-list">
            <span>Sem prompts.</span><span>Sem bloqueios.</span><span>Sem folhas em branco.</span><span>Sem horas perdidas.</span>
          </div>
        </div>
        <div className="aa-library-card" aria-label="Biblioteca de edições especializadas">
          <div className="aa-library-top"><span>AGENDA ATIVA<sup>™</sup></span><small>Biblioteca Editorial</small></div>
          <div className="aa-library-monogram"><img src="/aa-monogram-official.svg" alt="" /></div>
          <div className="aa-library-editions">
            <p><span>01</span> Wedding Edition</p>
            <p><span>02</span> Estética Edition</p>
            <p><span>03</span> Imobiliário Edition</p>
          </div>
          <p className="aa-library-signature">Hoje já está tratado.</p>
        </div>
      </section>

      <section className="aa-problem">
        <div className="brand-shell">
          <h2>O problema não é falta de ideias.</h2>
          <p>É ter de pensar nelas todos os dias.</p>
        </div>
      </section>

      <section className="aa-promise">
        <div className="brand-shell">
          <div className="aa-promise-lines">
            <p>Não vendemos IA.</p>
            <p>Não vendemos prompts.</p>
            <p>Não vendemos calendários editoriais.</p>
          </div>
          <p className="aa-promise-bridge">Vendemos algo muito mais simples:</p>
          <h2>Hoje já está tratado.</h2>
        </div>
      </section>

      <section className="aa-explore" id="como-funciona">
        <div className="brand-shell">
          <div className="aa-explore-intro">
            <p className="brand-kicker">Descubra a Agenda Ativa™</p>
            <h2>Tudo o que precisa.<br />Só quando quiser ver.</h2>
          </div>

          <div className="aa-explore-list">
            <details>
              <summary><span>Como funciona</span><small>Três passos. Nenhuma complicação.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-step-cards">
                  <article><span>01</span><h3>Escolha a sua edição.</h3></article>
                  <article><span>02</span><h3>Receba acesso imediato.</h3></article>
                  <article><span>03</span><h3>Copie.<br />Adapte.<br />Publique.</h3></article>
                </div>
              </div>
            </details>

            <details>
              <summary><span>O que recebe</span><small>Conteúdo e estratégia já preparados.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-benefit-grid">
                  {benefits.map((benefit) => <article key={benefit}><span>✓</span><h3>{benefit}</h3></article>)}
                </div>
              </div>
            </details>

            <details id="edicoes">
              <summary><span>Escolha a sua edição</span><small>Uma marca. Várias especializações.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-edition-list">
                  {editions.map((edition) => (
                    <article className={edition.available ? "is-available" : ""} key={edition.name}>
                      <h3>{edition.name}</h3><small>{edition.status}</small>
                      {edition.available && edition.href ? <a href={edition.href}>Ver edição <b>→</b></a> : <p>Em preparação</p>}
                    </article>
                  ))}
                </div>
              </div>
            </details>

            <details>
              <summary><span>Como é por dentro</span><small>Abra e encontre o dia resolvido.</small><b>+</b></summary>
              <div className="aa-explore-panel aa-explore-inside">
                <div className="aa-inside-copy">
                  <h2>Abre e encontra o dia resolvido.</h2>
                  <p>Sem menus desnecessários. Apenas o conteúdo que precisa, preparado para usar.</p>
                  <p className="aa-inside-note">Menos de cinco minutos entre abrir e publicar.</p>
                </div>
                <div className="aa-product-mockup">
                  <div className="aa-mockup-brand"><span>AGENDA ATIVA<sup>™</sup></span><small>Wedding Edition</small></div>
                  <p className="aa-mockup-status">Hoje já está tratado.</p>
                  <small className="aa-mockup-day">DIA 12 — CONTEÚDO DE HOJE</small>
                  <h3>3 erros que os noivos cometem ao escolher o venue.</h3>
                  <ul><li>Conteúdo preparado</li><li>Legenda pronta</li><li>CTA incluída</li></ul>
                  <button type="button">Copiar conteúdo</button>
                </div>
              </div>
            </details>

            <details>
              <summary><span>Para quem é</span><small>Para profissionais cuja agenda vem primeiro.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-professional-list">
                  {professionals.map((professional) => <p key={professional}>{professional}</p>)}
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="brand-faq brand-shell" id="faq">
        <div><p className="brand-kicker">Perguntas frequentes</p><h2>Antes de começar.</h2></div>
        <div className="brand-faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="brand-final">
        <img src="/aa-monogram-official.svg" alt="" />
        <p className="aa-final-wordmark">AGENDA ATIVA<sup>™</sup></p>
        <p className="brand-signature">Hoje já está tratado.</p>
        <h2>Menos tempo a criar conteúdo.<br />Mais tempo para trabalhar.</h2>
        <a className="brand-button brand-button-primary" href="#edicoes">Ver edições</a>
      </section>

      <footer className="brand-footer">
        <a className="brand-wordmark" href="#inicio">AGENDA ATIVA<sup>™</sup></a><p className="brand-footer-signature">Hoje já está tratado.</p><p>© 2026 Agenda Ativa™</p>
      </footer>
    </main>
  );
}
