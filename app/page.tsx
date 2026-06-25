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
          <p className="brand-eyebrow">Conteúdo estratégico. Decisões já tomadas.</p>
          <h1>A forma mais simples de manter a sua comunicação ativa, mesmo quando a sua agenda está cheia.</h1>
          <p className="brand-lead">Conteúdo estratégico preparado para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.</p>
          <div className="brand-actions">
            <a className="brand-button brand-button-primary" href="#edicoes">Explorar edições</a>
            <a className="brand-button brand-button-text" href="#como-funciona">Ver como funciona <span>↓</span></a>
          </div>
        </div>
        <div className="brand-hero-mark" aria-hidden="true">
          <div className="brand-mark-halo" />
          <img src="/aa-monogram-official.png" alt="" />
          <p>Hoje já está tratado.</p>
        </div>
      </section>

      <section className="aa-about brand-shell" aria-labelledby="about-title">
        <div className="aa-about-copy">
          <p className="brand-kicker">01 — A marca</p>
          <h2 id="about-title">O que é a Agenda Ativa<sup>™</sup>?</h2>
          <p>A Agenda Ativa™ é uma biblioteca de edições especializadas para profissionais que precisam de comunicar com consistência, mas não têm tempo para criar conteúdo todos os dias.</p>
          <p>Cada edição inclui 30 dias de conteúdo estratégico, pronto a adaptar e publicar.</p>
          <div className="aa-short-list">
            <span>Sem prompts.</span><span>Sem bloqueios.</span><span>Sem folhas em branco.</span><span>Sem horas perdidas.</span>
          </div>
        </div>
        <div className="aa-library-card" aria-label="Biblioteca de edições especializadas">
          <div className="aa-library-top"><span>AGENDA ATIVA<sup>™</sup></span><small>Biblioteca Editorial</small></div>
          <div className="aa-library-monogram"><img src="/aa-monogram-official.png" alt="" /></div>
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
          <p className="brand-kicker">02 — O problema</p>
          <h2>O problema não é falta de ideias.</h2>
          <p>É ter de pensar nelas todos os dias.</p>
        </div>
      </section>

      <section className="aa-promise">
        <div className="brand-shell">
          <p className="brand-kicker">03 — O que vendemos</p>
          <div className="aa-promise-lines">
            <p>Não vendemos IA.</p>
            <p>Não vendemos prompts.</p>
            <p>Não vendemos calendários editoriais.</p>
          </div>
          <p className="aa-promise-bridge">Vendemos algo muito mais simples:</p>
          <h2>Hoje já está tratado.</h2>
        </div>
      </section>

      <section className="aa-how" id="como-funciona">
        <div className="brand-shell">
          <div className="aa-section-heading">
            <p className="brand-kicker">04 — Como funciona</p>
            <h2>Três passos.<br />Nenhuma complicação.</h2>
          </div>
          <div className="aa-step-cards">
            <article><span>01</span><h3>Escolha a sua edição.</h3></article>
            <article><span>02</span><h3>Receba acesso imediato.</h3></article>
            <article><span>03</span><h3>Copie.<br />Adapte.<br />Publique.</h3></article>
          </div>
        </div>
      </section>

      <section className="aa-benefits brand-shell">
        <div className="aa-section-heading">
          <p className="brand-kicker">05 — O que recebe</p>
          <h2>Tudo o que precisa.<br />Nada que complique.</h2>
        </div>
        <div className="aa-benefit-grid">
          {benefits.map((benefit, index) => <article key={benefit}><span>✓</span><small>0{index + 1}</small><h3>{benefit}</h3></article>)}
        </div>
      </section>

      <section className="aa-editions" id="edicoes">
        <div className="brand-shell">
          <div className="aa-section-heading aa-section-heading-row">
            <div><p className="brand-kicker">06 — A biblioteca</p><h2>Escolha a sua edição.</h2></div>
            <p>Uma marca. Várias especializações.<br />A mesma tranquilidade editorial.</p>
          </div>
          <div className="aa-edition-list">
            {editions.map((edition, index) => (
              <article className={edition.available ? "is-available" : ""} key={edition.name}>
                <span>0{index + 1}</span><h3>{edition.name}</h3><small>{edition.status}</small>
                {edition.available && edition.href ? <a href={edition.href}>Ver edição <b>→</b></a> : <p>Em preparação</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-inside brand-shell">
        <div className="aa-inside-copy">
          <p className="brand-kicker">07 — Como é por dentro</p>
          <h2>Abre e encontra o dia resolvido.</h2>
          <p>Sem menus desnecessários. Sem uma nova ferramenta para aprender. Apenas o conteúdo que precisa, preparado para usar.</p>
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
      </section>

      <section className="aa-professionals">
        <div className="brand-shell">
          <div className="aa-section-heading"><p className="brand-kicker">08 — Para quem</p><h2>Criada para profissionais ocupados.</h2></div>
          <div className="aa-professional-list">
            {professionals.map((professional, index) => <p key={professional}><span>0{index + 1}</span>{professional}</p>)}
          </div>
        </div>
      </section>

      <section className="brand-faq brand-shell" id="faq">
        <div><p className="brand-kicker">09 — Perguntas frequentes</p><h2>Antes de começar.</h2></div>
        <div className="brand-faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="brand-final">
        <img src="/aa-monogram-official.png" alt="" />
        <p className="aa-final-wordmark">AGENDA ATIVA<sup>™</sup></p>
        <p className="brand-signature">Hoje já está tratado.</p>
        <h2>Menos tempo a criar conteúdo.<br />Mais tempo para trabalhar.</h2>
        <a className="brand-button brand-button-primary" href="#edicoes">Ver edições</a>
      </section>

      <footer className="brand-footer">
        <a className="brand-wordmark" href="#inicio">AGENDA ATIVA<sup>™</sup></a><p>Conteúdo estratégico para agendas reais.</p><p>© 2026 Agenda Ativa™</p>
      </footer>
    </main>
  );
}
