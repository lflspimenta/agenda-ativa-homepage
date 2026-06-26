import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  {
    nicho: "Wedding Planner",
    title: "Wedding Edition",
    status: "Disponível",
    href: "/agenda",
    image: "/assets/hero-wedding.png",
    accent: "terra",
    text: "30 dias de conteúdo estratégico para wedding planners. Autoridade, confiança e conversão — sem horas perdidas a criar."
  },
  {
    nicho: "Imobiliário",
    title: "Imobiliário Edition",
    status: "Disponível",
    href: "/imobiliario/agenda",
    image: "/assets/hero-imobiliario.png",
    accent: "petroleo",
    text: "30 dias de conteúdo editorial para consultores imobiliários. Ser lembrado antes de ser necessário."
  },
  {
    nicho: "Estética e Beleza",
    title: "Estética Edition",
    status: "Brevemente",
    href: "#edicoes",
    image: "/assets/hero-estetica.png",
    accent: "sage",
    text: "Para esteticistas e profissionais de beleza que querem presença consistente e autoridade digital."
  },
  {
    nicho: "Jurídico",
    title: "Advogados Edition",
    status: "Brevemente",
    href: "#edicoes",
    image: "/assets/hero-advogados.png",
    accent: "graphite",
    text: "Para advogados e sociedades profissionais que pretendem construir autoridade e credibilidade."
  },
  {
    nicho: "Fotografia",
    title: "Fotógrafos Edition",
    status: "Brevemente",
    href: "#edicoes",
    image: "/assets/hero-fotografos.png",
    accent: "burgundy",
    text: "Para fotógrafos e criadores visuais que querem comunicar além das fotografias."
  },
  {
    nicho: "Saúde Mental",
    title: "Psicólogos Edition",
    status: "Brevemente",
    href: "#edicoes",
    image: "/assets/hero-psicologos.png",
    accent: "warm",
    text: "Para psicólogos e terapeutas que precisam de presença digital consistente e profissional."
  }
];

const faqs = [
  ["Preciso de usar ChatGPT?", "Não. A Agenda Ativa™ já vem pronta a usar. Não recebe prompts para gerar conteúdo — recebe o conteúdo já escrito e estruturado."],
  ["É uma subscrição?", "Não. Cada edição tem pagamento único, sem mensalidades e sem subscrições. Compra uma vez, acede quando quiser."],
  ["Recebo acesso quando?", "Imediatamente após a compra. Sem espera, sem instalações, sem plataformas complexas."],
  ["Posso adaptar o conteúdo?", "Sim. O conteúdo foi criado para ser adaptado à sua voz e ao seu negócio. Pode usar como está ou ajustar o que quiser."],
  ["E se outras profissionais da minha área comprarem?", "A Agenda Ativa™ fornece a estrutura estratégica. A sua identidade final vem das suas fotografias, do seu trabalho real e da sua voz — esses elementos são sempre únicos."],
  ["Preciso de publicar todos os dias?", "Não. Pode usar a Agenda Ativa™ ao seu ritmo. A estrutura existe para dar consistência, não para criar pressão."]
];

export default function HomePage() {
  return (
    <main className="aa-home">
      <LoginSessionHandler />

      {/* NAV */}
      <header className="aa-nav">
        <div className="aa-nav-inner">
          <a className="aa-logo" href="#inicio">
            <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 88 L38 12 L68 88" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
              <line x1="20" y1="62" x2="56" y2="62" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
              <path d="M38 88 L68 12 L98 88" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
              <line x1="50" y1="62" x2="86" y2="62" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
            </svg>
            <span>AGENDA ATIVA<sup>™</sup></span>
          </a>
          <nav className="aa-navlinks">
            <a href="#edicoes">Edições</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="aa-navcta" href="#edicoes">Explorar edições</a>
        </div>
      </header>

      {/* HERO */}
      <section className="aa-hero" id="inicio">
        <div className="aa-hero-inner">
          <p className="aa-eyebrow">Sistema Editorial</p>
          <h1>O conteúdo<br />que precisa.<br /><em>Já escrito.</em></h1>
          <p className="aa-lead">A Agenda Ativa™ é uma biblioteca de edições especializadas para profissionais que precisam de comunicar com consistência, mas não têm tempo para criar conteúdo todos os dias.</p>
          <div className="aa-hero-actions">
            <a className="aa-btn" href="#edicoes">Explorar Edições</a>
            <a className="aa-btn aa-btn-ghost" href="#como-funciona">Ver como funciona</a>
          </div>
          <p className="aa-footnote">Pagamento único. Sem mensalidades. Acesso imediato.</p>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="aa-statement">
        <p className="aa-eyebrow">Sistema de Comunicação Estratégica</p>
        <h2>O problema não é falta de ideias.<br /><em>É ter de pensar nelas todos os dias.</em></h2>
        <p>Publicar uma vez é fácil. Continuar a publicar quando a agenda está cheia é outra história. A Agenda Ativa™ foi criada para resolver esse "depois".</p>
      </section>

      {/* O QUE É / NÃO É */}
      <section className="aa-identity">
        <div className="aa-panel aa-panel-dark">
          <p className="aa-kicker">Posicionamento</p>
          <h2>Não vendemos<br />ferramentas.</h2>
          <p>A Agenda Ativa™ não vende IA. Não vende prompts. Não vende calendários editoriais. Vende algo muito mais simples:</p>
          <ul className="aa-list aa-list-neg">
            <li>IA ou prompts para gerar conteúdo</li>
            <li>Calendários editoriais genéricos</li>
            <li>Ferramentas que exigem aprendizagem</li>
            <li>Conteúdo que poderia pedir ao ChatGPT</li>
          </ul>
        </div>
        <div className="aa-panel">
          <p className="aa-kicker">O que recebe</p>
          <h2>A tranquilidade<br />de saber que hoje<br /><em>já está tratado.</em></h2>
          <ul className="aa-list aa-list-pos">
            <li>Tempo recuperado para focar nos clientes</li>
            <li>Consistência sem depender de inspiração</li>
            <li>Decisões estratégicas já tomadas</li>
            <li>Presença digital contínua e profissional</li>
            <li>Clareza sobre o que publicar e porquê</li>
          </ul>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="aa-how" id="como-funciona">
        <p className="aa-kicker">Como funciona</p>
        <h2>Três passos.<br /><em>Zero complicação.</em></h2>
        <div className="aa-steps">
          <div className="aa-step">
            <span className="aa-step-num">01</span>
            <div>
              <strong>Escolha a edição</strong>
              <p>Wedding Planner, Imobiliário, Estética, Advogados, Fotógrafos e outras áreas profissionais.</p>
            </div>
          </div>
          <div className="aa-step-arrow" aria-hidden="true" />
          <div className="aa-step">
            <span className="aa-step-num">02</span>
            <div>
              <strong>Copie</strong>
              <p>Abra o conteúdo do dia. Copie a legenda e o call to action num único clique.</p>
            </div>
          </div>
          <div className="aa-step-arrow" aria-hidden="true" />
          <div className="aa-step">
            <span className="aa-step-num">03</span>
            <div>
              <strong>Publique</strong>
              <p>Cole no Instagram. Adapte à sua voz se quiser. A decisão já estava tomada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDIÇÕES */}
      <section className="aa-editions" id="edicoes">
        <div className="aa-editions-head">
          <p className="aa-kicker">Edições disponíveis</p>
          <h2>Escolha a sua edição.</h2>
          <p>Cada edição foi criada especificamente para o nicho que serve. O método é sempre o mesmo. O conteúdo é sempre específico.</p>
        </div>
        <div className="aa-grid">
          {editions.map((ed) => (
            <article className={`aa-card aa-card-${ed.accent}`} key={ed.title}>
              <div className="aa-card-bar" />
              <div className="aa-card-photo">
                <img src={ed.image} alt={ed.title} />
              </div>
              <div className="aa-card-body">
                <p className="aa-card-nicho">{ed.nicho}</p>
                <h3>{ed.title}</h3>
                <p>{ed.text}</p>
                <div className="aa-card-footer">
                  <span className={`aa-pill ${ed.status === "Disponível" ? "aa-pill-on" : "aa-pill-soon"}`}>
                    {ed.status}
                  </span>
                  <a className={`aa-card-cta ${ed.status !== "Disponível" ? "aa-card-cta-muted" : ""}`} href={ed.href}>
                    {ed.status === "Disponível" ? "Ver edição →" : "Entrar na lista →"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* O QUE RECEBE */}
      <section className="aa-receive">
        <p className="aa-kicker aa-kicker-center">O que recebe em cada edição</p>
        <div className="aa-receive-inner">
          <ul className="aa-checklist">
            <li>30 dias de conteúdo estratégico pronto a publicar</li>
            <li>Legendas preparadas com estrutura editorial definida</li>
            <li>Call to action incluída em cada conteúdo</li>
            <li>5 pilares estratégicos: autoridade, confiança, proximidade, desejo e conversão</li>
            <li>Menos de 5 minutos por dia para manter presença ativa</li>
            <li>Acesso imediato após a compra</li>
          </ul>
          <div className="aa-receive-aside">
            <h3>Não é um gerador.<br /><em>É uma agenda.</em></h3>
            <p>Cada conteúdo foi criado com uma intenção estratégica clara. Cada dia existe para mover o leitor um passo: da curiosidade à confiança, da confiança ao contacto.</p>
            <p>O nicho muda. O método permanece.</p>
          </div>
        </div>
      </section>

      {/* BAND */}
      <section className="aa-band">
        <h2>Continue focado<br />nos seus clientes.</h2>
        <p>A sua comunicação mantém-se ativa com 30 dias de conteúdo estratégico pronto a copiar, adaptar e publicar.</p>
        <a className="aa-btn aa-btn-light" href="#edicoes">Explorar Edições</a>
      </section>

      {/* FAQ */}
      <section className="aa-faq" id="faq">
        <p className="aa-kicker">Perguntas frequentes</p>
        <div className="aa-faq-grid">
          {faqs.map(([q, a]) => (
            <div className="aa-faq-item" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="aa-footer-cta">
        <svg className="aa-mono-gold" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 88 L38 12 L68 88" stroke="#C9A96E" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="20" y1="62" x2="56" y2="62" stroke="#C9A96E" strokeWidth="5" strokeLinecap="round"/>
          <path d="M38 88 L68 12 L98 88" stroke="#C9A96E" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1="50" y1="62" x2="86" y2="62" stroke="#C9A96E" strokeWidth="5" strokeLinecap="round"/>
        </svg>
        <h2>Agenda Ativa™</h2>
        <em className="aa-assinatura">Hoje já está tratado.</em>
        <a className="aa-btn aa-btn-light" href="#edicoes">Explorar Edições</a>
        <p>Menos tempo a criar conteúdo. Mais tempo para trabalhar.</p>
      </section>

      {/* FOOTER */}
      <footer className="aa-footer">
        <span>Agenda Ativa™</span>
        <span>Sistema editorial pronto a usar para profissionais.</span>
        <span>Portugal</span>
      </footer>
    </main>
  );
}
