import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  {
    name: "Wedding Planners",
    label: "Wedding Edition",
    status: "Disponível",
    href: "/wedding",
    image: "/homepage-assets/wedding-planner.png",
    accent: "#B55E4A",
    text: "Continue focada nos noivos. A sua agenda continua ativa.",
    available: true
  },
  {
    name: "Imobiliário",
    label: "Imobiliário Edition",
    status: "Disponível",
    href: "/imobiliario/",
    image: "/homepage-assets/imobiliario.png",
    accent: "#2F4B59",
    text: "Continue focado nos clientes. A sua presença continua ativa.",
    available: true
  },
  {
    name: "Psicologia",
    label: "Psicologia Edition",
    status: "Brevemente",
    image: "/homepage-assets/psicologia.png",
    accent: "#7D8F76",
    text: "Continue presente para quem precisa de si.",
    available: false
  },
  {
    name: "Advogados",
    label: "Advogados Edition",
    status: "Brevemente",
    image: "/homepage-assets/advogados.png",
    accent: "#25282D",
    text: "Continue focado nos processos. A sua autoridade continua visível.",
    available: false
  },
  {
    name: "Fotógrafos",
    label: "Fotografia Edition",
    status: "Brevemente",
    image: "/homepage-assets/fotografos.png",
    accent: "#682E37",
    text: "Continue atrás da câmara. A sua comunicação continua ativa.",
    available: false
  }
];

const faqs = [
  ["O que é exatamente a Agenda Ativa™?", "É uma coleção de edições especializadas com conteúdo estratégico pronto a copiar, adaptar e publicar. Cada edição foi pensada para uma profissão específica."],
  ["É uma ferramenta de IA?", "Não. A Agenda Ativa™ não vende IA, prompts ou ferramentas. Entrega comunicação já preparada para profissionais que querem poupar tempo."],
  ["Preciso de fazer alguma coisa antes de publicar?", "Só precisa de escolher a edição, copiar o conteúdo do dia, adaptar pequenos detalhes ao seu tom e publicar."],
  ["O conteúdo é igual para todos os nichos?", "Não. Cada Edition tem contexto, exemplos, linguagem e dores específicas da profissão."],
  ["É uma subscrição?", "Não. Cada Edition é comprada separadamente, com pagamento único, sem mensalidades e sem subscrições."],
  ["Posso adaptar os textos à minha marca?", "Sim. A estratégia já está pronta, mas pode ajustar o tom, acrescentar exemplos reais e usar as suas próprias imagens."],
];

export default function HomePage() {
  return (
    <main className="aa-home-v4">
      <LoginSessionHandler />

      <nav className="aa4-nav" aria-label="Navegação principal">
        <a className="aa4-brand" href="#inicio" aria-label="Agenda Ativa, início">
          <img src="/aa-monogram-official.svg" alt="" />
          <span>AGENDA ATIVA<sup>™</sup></span>
        </a>
        <div className="aa4-nav-links">
          <a href="#edicoes">Edições</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="aa4-nav-cta" href="#edicoes">Explorar edições →</a>
      </nav>

      <section className="aa4-hero" id="inicio">
        <div className="aa4-hero-copy">
          <p className="aa4-kicker">Hoje já está tratado.</p>
          <h1>A comunicação da sua marca pronta antes do dia começar.</h1>
          <p>Conteúdo estratégico pronto a copiar, adaptar e publicar. Para profissionais que preferem trabalhar com clientes em vez de perder horas a pensar no que publicar.</p>
          <a className="aa4-button" href="#edicoes">Explorar edições →</a>
        </div>
        <div className="aa4-hero-visual" aria-hidden="true">
          <div className="aa4-hero-card aa4-hero-card-main">
            <img src="/homepage-assets/imobiliario.png" alt="" />
          </div>
          <div className="aa4-hero-card aa4-hero-card-small aa4-small-one">
            <img src="/homepage-assets/wedding-planner.png" alt="" />
          </div>
          <div className="aa4-hero-card aa4-hero-card-small aa4-small-two">
            <img src="/homepage-assets/fotografos.png" alt="" />
          </div>
        </div>
      </section>

      <section className="aa4-manifesto" aria-labelledby="manifesto-title">
        <p className="aa4-kicker">A Agenda Ativa™</p>
        <h2 id="manifesto-title">Não vendemos IA. Não vendemos prompts. Não vendemos calendários editoriais.</h2>
        <p>Vendemos comunicação já preparada.</p>
      </section>

      <section className="aa4-editions" id="edicoes" aria-labelledby="editions-title">
        <div className="aa4-section-head">
          <p className="aa4-kicker">As edições</p>
          <h2 id="editions-title">O seu nicho. A sua edição.</h2>
          <p>Escolha a Edition criada para a sua profissão. A marca é a mesma. O contexto muda.</p>
        </div>

        <div className="aa4-edition-grid">
          {editions.map((edition) => (
            <article className="aa4-edition-card" key={edition.name} style={{ "--edition-accent": edition.accent } as React.CSSProperties}>
              <div className="aa4-edition-image">
                <img src={edition.image} alt={edition.label} />
                <span>{edition.status}</span>
              </div>
              <div className="aa4-edition-copy">
                <p>{edition.label}</p>
                <h3>{edition.name}</h3>
                <small>{edition.text}</small>
                {edition.available && edition.href ? (
                  <a href={edition.href}>Explorar →</a>
                ) : (
                  <span className="aa4-soon">Em preparação</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="aa4-how" id="como-funciona" aria-labelledby="how-title">
        <div className="aa4-section-head">
          <p className="aa4-kicker">Como funciona</p>
          <h2 id="how-title">Simples como 1, 2, 3.</h2>
        </div>
        <div className="aa4-steps">
          <article><span>01</span><h3>Escolha</h3><p>Selecione a edição que representa o seu trabalho.</p></article>
          <article><span>02</span><h3>Copie</h3><p>Abra o conteúdo do dia e copie em segundos.</p></article>
          <article><span>03</span><h3>Publique</h3><p>Adapte ao seu tom e mantenha a presença ativa.</p></article>
        </div>
      </section>

      <section className="aa4-split">
        <div>
          <p className="aa4-kicker">O que vendemos</p>
          <ul>
            <li>Tempo recuperado</li>
            <li>Consistência sem esforço</li>
            <li>Clareza</li>
            <li>Decisões já tomadas</li>
          </ul>
        </div>
        <div>
          <p className="aa4-kicker">O que não vendemos</p>
          <ul>
            <li>IA</li>
            <li>Prompts</li>
            <li>Ferramentas complexas</li>
            <li>Subscrições</li>
          </ul>
        </div>
      </section>

      <section className="aa4-faq" id="faq" aria-labelledby="faq-title">
        <div className="aa4-section-head">
          <p className="aa4-kicker">Perguntas frequentes</p>
          <h2 id="faq-title">Tudo o que precisa de saber.</h2>
        </div>
        <div className="aa4-faq-grid">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="aa4-final">
        <div>
          <p className="aa4-kicker">Agenda Ativa™</p>
          <h2>A sua comunicação. <em>Tratada.</em> Todos os dias.</h2>
          <p>Menos tempo no Instagram. Mais tempo para o que é seu.</p>
          <a className="aa4-button aa4-button-gold" href="#edicoes">Explorar edições →</a>
        </div>
      </section>
    </main>
  );
}
