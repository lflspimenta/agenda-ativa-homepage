import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  { name: "Wedding Edition", status: "DisponÃ­vel", href: "/wedding", available: true },
  { name: "ImobiliÃ¡rio Edition", status: "DisponÃ­vel", href: "/imobiliario", available: true },
  { name: "FotÃ³grafos Edition", status: "DisponÃ­vel", href: "/fotografos", available: true },
  { name: "EstÃ©tica Edition", status: "Brevemente", available: false },
  { name: "Advogados Edition", status: "Brevemente", available: false }
];

const benefits = [
  "30 dias de conteÃºdo",
  "Legendas preparadas",
  "CTA incluÃ­da",
  "EstratÃ©gia definida",
  "Menos de 1 minuto por dia",
  "Acesso imediato"
];

const professionals = [
  "Wedding Planners",
  "Profissionais de EstÃ©tica",
  "Consultores ImobiliÃ¡rios",
  "Advogados",
  "FotÃ³grafos"
];

const faqs = [
  ["O que Ã© a Agenda Ativaâ„¢?", "Ã‰ uma biblioteca de ediÃ§Ãµes especializadas com 30 dias de conteÃºdo estratÃ©gico, preparado para adaptar e publicar."],
  ["O que preciso de fazer para comeÃ§ar?", "Nada. O conteÃºdo jÃ¡ sai escrito e pronto."],
  ["Como recebo o acesso?", "O acesso Ã  ediÃ§Ã£o disponÃ­vel Ã© enviado imediatamente apÃ³s a confirmaÃ§Ã£o da compra."],
  ["Posso adaptar o conteÃºdo Ã  minha marca?", "Sim. A estrutura, a legenda e a estratÃ©gia estÃ£o definidas, mas pode ajustar o tom e usar as suas prÃ³prias imagens."],
  ["VÃ£o existir novas ediÃ§Ãµes?", "Sim. A Agenda Ativaâ„¢ continuarÃ¡ a crescer com ediÃ§Ãµes dedicadas a diferentes Ã¡reas profissionais."]
];

export default function HomePage() {
  return (
    <main className="brand-home">
      <LoginSessionHandler />
      <nav className="brand-nav" aria-label="NavegaÃ§Ã£o principal">
        <a className="brand-wordmark" href="#inicio" aria-label="Agenda Ativa, inÃ­cio">AGENDA ATIVA<sup>â„¢</sup></a>
        <div className="brand-nav-links"><a href="#como-funciona">Como funciona</a><a href="#edicoes">EdiÃ§Ãµes</a><a href="#faq">FAQ</a></div>
        <a className="brand-nav-cta" href="#edicoes">Explorar ediÃ§Ãµes</a>
      </nav>

      <section className="brand-hero" id="inicio">
        <div className="brand-hero-copy">
          <p className="brand-eyebrow">Menos tempo a criar. Mais tempo para trabalhar.</p>
          <h1>A forma mais simples de manter a sua comunicaÃ§Ã£o ativa, mesmo quando a sua agenda estÃ¡ cheia.</h1>
          <p className="brand-lead">ConteÃºdo estratÃ©gico preparado para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.</p>
          <div className="brand-actions">
            <a className="brand-button brand-button-primary" href="#edicoes">Explorar ediÃ§Ãµes</a>
            <a className="brand-button brand-button-text" href="#como-funciona">Ver como funciona <span>â†“</span></a>
          </div>
        </div>
        <div className="brand-hero-mark" aria-hidden="true">
          <img src="/aa-monogram-official.svg" alt="" />
          <p>Hoje jÃ¡ estÃ¡ tratado.</p>
        </div>
      </section>

      <section className="aa-about brand-shell" aria-labelledby="about-title">
        <div className="aa-about-copy">
          <p className="brand-kicker">Agenda Ativaâ„¢</p>
          <h2 id="about-title">O que Ã© a Agenda Ativa<sup>â„¢</sup>?</h2>
          <p>A Agenda Ativaâ„¢ Ã© uma biblioteca de ediÃ§Ãµes especializadas para profissionais que precisam de comunicar com consistÃªncia, mas nÃ£o tÃªm tempo para criar conteÃºdo todos os dias.</p>
          <p>Cada ediÃ§Ã£o inclui 30 dias de conteÃºdo estratÃ©gico, pronto a adaptar e publicar.</p>
          <div className="aa-short-list">
            <span>Sem prompts.</span><span>Sem bloqueios.</span><span>Sem folhas em branco.</span><span>Sem horas perdidas.</span>
          </div>
        </div>
        <div className="aa-library-card" aria-label="Biblioteca de ediÃ§Ãµes especializadas">
          <div className="aa-library-top"><span>AGENDA ATIVA<sup>â„¢</sup></span><small>Biblioteca Editorial</small></div>
          <div className="aa-library-monogram"><img src="/aa-monogram-official.svg" alt="" /></div>
          <div className="aa-library-editions">
            <p><span>01</span> Wedding Edition</p>
            <p><span>02</span> EstÃ©tica Edition</p>
            <p><span>03</span> ImobiliÃ¡rio Edition</p>
          </div>
          <p className="aa-library-signature">Hoje jÃ¡ estÃ¡ tratado.</p>
        </div>
      </section>

      <section className="aa-problem">
        <div className="brand-shell">
          <h2>O problema nÃ£o Ã© falta de ideias.</h2>
          <p>Ã‰ ter de pensar nelas todos os dias.</p>
        </div>
      </section>

      <section className="aa-promise">
        <div className="brand-shell">
          <div className="aa-promise-lines">
            <p>NÃ£o vendemos IA.</p>
            <p>NÃ£o vendemos prompts.</p>
            <p>Vendemos legendas jÃ¡ escritas.</p>
          </div>
          <p className="aa-promise-bridge">Vendemos algo muito mais simples:</p>
          <h2>Hoje jÃ¡ estÃ¡ tratado.</h2>
        </div>
      </section>

      <section className="aa-explore" id="como-funciona">
        <div className="brand-shell">
          <div className="aa-explore-intro">
            <p className="brand-kicker">Descubra a Agenda Ativaâ„¢</p>
            <h2>Tudo o que precisa.<br />SÃ³ quando quiser ver.</h2>
          </div>

          <div className="aa-explore-list">
            <details>
              <summary><span>Como funciona</span><small>TrÃªs passos. Nenhuma complicaÃ§Ã£o.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-step-cards">
                  <article><span>01</span><h3>Escolha a sua ediÃ§Ã£o.</h3></article>
                  <article><span>02</span><h3>Receba acesso imediato.</h3></article>
                  <article><span>03</span><h3>Abres.<br />Copias.<br />Colas.<br />Publicas.</h3></article>
                </div>
              </div>
            </details>

            <details>
              <summary><span>O que recebe</span><small>ConteÃºdo e estratÃ©gia jÃ¡ preparados.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-benefit-grid">
                  {benefits.map((benefit) => <article key={benefit}><span>âœ“</span><h3>{benefit}</h3></article>)}
                </div>
              </div>
            </details>

            <details id="edicoes">
              <summary><span>Escolha a sua ediÃ§Ã£o</span><small>Uma marca. VÃ¡rias especializaÃ§Ãµes.</small><b>+</b></summary>
              <div className="aa-explore-panel">
                <div className="aa-edition-list">
                  {editions.map((edition) => (
                    <article className={edition.available ? "is-available" : ""} key={edition.name}>
                      <h3>{edition.name}</h3><small>{edition.status}</small>
                      {edition.available && edition.href ? <a href={edition.href}>Ver ediÃ§Ã£o <b>â†’</b></a> : <p>Em preparaÃ§Ã£o</p>}
                    </article>
                  ))}
                </div>
              </div>
            </details>

            <details>
              <summary><span>Como Ã© por dentro</span><small>Abra e encontre o dia resolvido.</small><b>+</b></summary>
              <div className="aa-explore-panel aa-explore-inside">
                <div className="aa-inside-copy">
                  <h2>Abre e encontra o dia resolvido.</h2>
                  <p>Sem menus desnecessÃ¡rios. Apenas o conteÃºdo que precisa, preparado para usar.</p>
                  <p className="aa-inside-note">Menos de 1 minuto entre abrir e publicar.</p>
                </div>
                <div className="aa-product-mockup">
                  <div className="aa-mockup-brand"><span>AGENDA ATIVA<sup>â„¢</sup></span><small>Wedding Edition</small></div>
                  <p className="aa-mockup-status">Hoje jÃ¡ estÃ¡ tratado.</p>
                  <small className="aa-mockup-day">DIA 1 â€” CONTEÃšDO DE HOJE</small>
                  <h3>Como escolher o fotÃ³grafo ideal para o seu casamento sem arrependimentos.</h3>
                  <div className="aa-mockup-caption">
                    <p>Escolher o fotÃ³grafo do casamento nÃ£o Ã© apenas escolher imagens bonitas. Ã‰ escolher a pessoa que vai guardar a memÃ³ria de um dos dias mais importantes da sua vida.</p>
                    <p>Antes de decidir, veja portefÃ³lios completos, confirme se o estilo combina convosco e perceba como o profissional conduz os momentos mais delicados do dia.</p>
                    <p>A melhor escolha Ã© aquela que vos deixa tranquilos antes, durante e depois do casamento.</p>
                  </div>
                  <p className="aa-mockup-cta"><strong>CTA:</strong> Guarde este post para quando comeÃ§ar a procurar fornecedores.</p>
                  <button type="button">Copiar conteÃºdo</button>
                </div>
              </div>
            </details>

            <details>
              <summary><span>Para quem Ã©</span><small>Para profissionais cuja agenda vem primeiro.</small><b>+</b></summary>
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
        <div><p className="brand-kicker">Perguntas frequentes</p><h2>Antes de comeÃ§ar.</h2></div>
        <div className="brand-faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="brand-final">
        <img src="/aa-monogram-official.svg" alt="" />
        <p className="aa-final-wordmark">AGENDA ATIVA<sup>â„¢</sup></p>
        <p className="brand-signature">Hoje jÃ¡ estÃ¡ tratado.</p>
        <h2>Menos tempo a criar conteÃºdo.<br />Mais tempo para trabalhar.</h2>
        <a className="brand-button brand-button-primary" href="#edicoes">Ver ediÃ§Ãµes</a>
      </section>

      <footer className="brand-footer">
        <a className="brand-wordmark" href="#inicio">AGENDA ATIVA<sup>â„¢</sup></a><p className="brand-footer-signature">Hoje jÃ¡ estÃ¡ tratado.</p><p>Â© 2026 Agenda Ativaâ„¢</p>
      </footer>
    </main>
  );
}

