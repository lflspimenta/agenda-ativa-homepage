import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  {
    title: "Wedding Planners",
    label: "Wedding Edition",
    status: "Disponível",
    href: "/wedding",
    image: "/homepage-assets/edition-wedding.jpg",
    accent: "terracotta",
    text: "Continue focada nos noivos. A sua agenda continua ativa."
  },
  {
    title: "Imobiliário",
    label: "Imobiliário Edition",
    status: "Disponível",
    href: "/imobiliario/index.html",
    image: "/homepage-assets/imobiliario-office.jpg",
    accent: "petroleo",
    text: "Continue focado nos clientes. A sua autoridade continua ativa."
  },
  {
    title: "Estética",
    label: "Estética Edition",
    status: "Brevemente",
    href: "#faq",
    image: "/homepage-assets/edition-estetica.jpg",
    accent: "sage",
    text: "Entre tratamento e tratamento, a sua presença continua ativa."
  },
  {
    title: "Advogados",
    label: "Advogados Edition",
    status: "Brevemente",
    href: "#faq",
    image: "/homepage-assets/edition-juridico.jpg",
    accent: "graphite",
    text: "A sua autoridade jurídica continua visível, com rigor e clareza."
  },
  {
    title: "Fotógrafos",
    label: "Fotógrafos Edition",
    status: "Brevemente",
    href: "#faq",
    image: "/homepage-assets/edition-fotografos.jpg",
    accent: "burgundy",
    text: "Os clientes do próximo ano começam a escolher agora."
  }
];

const faqs = [
  ["O que é exatamente a Agenda Ativa™?", "É uma coleção de edições profissionais com comunicação já preparada para publicar. Cada edição é criada para um nicho específico e ajuda-o a manter presença digital sem começar do zero todos os dias."],
  ["Preciso de fazer alguma coisa antes de publicar?", "Não. Abre a edição, escolhe o conteúdo do dia, copia, adapta se quiser e publica. A decisão principal já está tomada."],
  ["O conteúdo é genérico ou específico para o meu nicho?", "Cada Edition é pensada para uma profissão concreta. A Wedding fala com wedding planners. A Imobiliário fala com consultores imobiliários. O método mantém-se; o contexto muda."],
  ["Posso adaptar o texto ao meu tom?", "Sim. A Agenda Ativa™ entrega a estrutura, a ideia e o texto base. A identidade final continua a ser sua."],
  ["Isto é uma subscrição?", "Não. O modelo oficial é pagamento único, sem mensalidades, sem subscrições e com acesso imediato à Edition comprada."],
  ["Como funciona o pagamento?", "Compra a Edition pretendida, recebe acesso imediato e começa a utilizar. Sem renovação automática."],
];

export default function HomePage() {
  return (
    <main className="home-v3" id="inicio">
      <LoginSessionHandler />

      <nav className="hv3-nav" aria-label="Navegação principal">
        <a className="hv3-brand" href="#inicio" aria-label="Agenda Ativa — Início">
          <img src="/aa-monogram-official.svg" alt="" />
          <span>AGENDA ATIVA<sup>™</sup></span>
        </a>
        <div className="hv3-navlinks">
          <a href="#edicoes">Edições</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="hv3-navcta" href="#edicoes">Explorar edições →</a>
      </nav>

      <section className="hv3-hero">
        <div className="hv3-hero-copy">
          <p className="hv3-kicker">Hoje já está tratado.</p>
          <h1>Conteúdo estratégico pronto a copiar, adaptar e publicar.</h1>
          <p className="hv3-lead">Para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.</p>
          <a className="hv3-button" href="#edicoes">Explorar edições →</a>
        </div>
        <div className="hv3-hero-image" aria-hidden="true">
          <img src="/homepage-assets/home-hero.jpg" alt="" />
        </div>
      </section>

      <section className="hv3-manifesto" aria-label="Manifesto Agenda Ativa">
        <p className="hv3-kicker">A Agenda Ativa™</p>
        <h2>Não vendemos IA. Não vendemos prompts. Não vendemos calendários editoriais.<br /><em>Vendemos comunicação já preparada.</em></h2>
        <p>Para profissionais que preferem ter tempo para o que realmente importa.</p>
      </section>

      <section className="hv3-editions" id="edicoes">
        <div className="hv3-section-head">
          <p className="hv3-kicker">As edições</p>
          <h2>O seu nicho.<br /><em>A sua edição.</em></h2>
        </div>
        <div className="hv3-edition-grid">
          {editions.map((edition) => (
            <article className={`hv3-edition-card ${edition.accent}`} key={edition.title}>
              <img src={edition.image} alt="" />
              <div className="hv3-edition-overlay">
                <small>{edition.status}</small>
                <p>{edition.label}</p>
                <h3>{edition.title}</h3>
                <span>{edition.text}</span>
                <a href={edition.href}>{edition.status === "Disponível" ? "Explorar" : "Brevemente"} →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hv3-how" id="como-funciona">
        <p className="hv3-kicker">Como funciona</p>
        <h2>Simples como 1, 2, 3.</h2>
        <div className="hv3-steps">
          <article>
            <span>01</span>
            <h3>Escolha</h3>
            <p>Seleciona a edição que representa o seu trabalho.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Copie</h3>
            <p>Abre o conteúdo do dia e copia em segundos.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Publique</h3>
            <p>Publica no Instagram. Fim. Todos os dias.</p>
          </article>
        </div>
      </section>

      <section className="hv3-value">
        <div>
          <div className="hv3-value-icon">✓</div>
          <p className="hv3-kicker">O que vendemos</p>
          <ul>
            <li>Tempo recuperado</li>
            <li>Consistência sem esforço</li>
            <li>Comunicação estratégica</li>
            <li>Decisões já tomadas</li>
          </ul>
        </div>
        <div>
          <div className="hv3-value-icon">×</div>
          <p className="hv3-kicker">O que não vendemos</p>
          <ul>
            <li>IA</li>
            <li>Prompts</li>
            <li>Ferramentas</li>
            <li>Calendários complexos</li>
          </ul>
        </div>
      </section>

      <section className="hv3-faq" id="faq">
        <p className="hv3-kicker">Perguntas frequentes</p>
        <h2>Tudo o que precisa de saber.</h2>
        <div className="hv3-faq-grid">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="hv3-final">
        <div className="hv3-final-image" aria-hidden="true"><img src="/homepage-assets/final-dark.jpg" alt="" /></div>
        <div>
          <h2>A sua comunicação.<br /><em>Tratada.</em> Todos os dias.</h2>
          <p>Menos tempo no Instagram. Mais tempo para o que é seu.</p>
          <a className="hv3-button gold" href="#edicoes">Explorar edições →</a>
        </div>
      </section>
    </main>
  );
}
