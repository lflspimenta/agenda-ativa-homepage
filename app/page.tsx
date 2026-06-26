import { LoginSessionHandler } from "./entrar/login-session-handler";

const editions = [
  {
    key: "wedding",
    name: "Wedding Edition",
    status: "Disponível",
    href: "/wedding",
    accent: "Terracota",
    description: "Para wedding planners que querem manter presença ativa sem perder foco nos noivos.",
    image: "/wedding_hero_photo_v10_4.png"
  },
  {
    key: "imobiliario",
    name: "Imobiliário Edition",
    status: "Disponível",
    href: "/imobiliario",
    accent: "Azul petróleo",
    description: "Para consultores imobiliários que querem ser lembrados antes de serem necessários.",
    image: "/homepage-imobiliario-hero.png"
  },
  {
    key: "estetica",
    name: "Estética Edition",
    status: "Brevemente",
    href: "#edicoes",
    accent: "Verde sálvia",
    description: "Para profissionais de estética que querem comunicar com calma, consistência e confiança.",
    image: "/produto-preview-mobile.png"
  }
];

const upcoming = ["Advogados Edition", "Fotógrafos Edition"];

export default function HomePage() {
  return (
    <main className="aa-home-v2">
      <LoginSessionHandler />

      <nav className="aa2-nav" aria-label="Navegação principal">
        <a className="aa2-brand" href="#inicio" aria-label="Agenda Ativa, início">
          <img src="/aa-monogram-official.svg" alt="" />
          <span></span>
          <strong>AGENDA ATIVA<sup>™</sup><em>Hoje já está tratado.</em></strong>
        </a>
        <div className="aa2-navlinks">
          <a href="#marca">O que é</a>
          <a href="#funciona">Como funciona</a>
          <a href="#edicoes">Edições</a>
        </div>
        <a className="aa2-navcta" href="#edicoes">Explorar edições</a>
      </nav>

      <section className="aa2-hero" id="inicio">
        <div className="aa2-hero-copy">
          <p className="aa2-kicker">Marca editorial para profissionais ocupados</p>
          <h1>A sua comunicação ativa, mesmo quando a sua agenda está cheia.</h1>
          <p>Conteúdo estratégico preparado para profissionais que preferem trabalhar com clientes em vez de passar horas a pensar no que publicar.</p>
          <div className="aa2-actions">
            <a className="aa2-btn" href="#edicoes">Explorar edições</a>
            <a className="aa2-link" href="#funciona">Ver como funciona</a>
          </div>
        </div>
        <div className="aa2-hero-image" aria-hidden="true">
          <img src="/homepage-imobiliario-hero.png" alt="" />
        </div>
      </section>

      <section className="aa2-strip" aria-label="Benefícios principais">
        <div>
          <span>01</span>
          <strong>Tempo recuperado</strong>
          <p>Menos horas a criar conteúdo. Mais tempo para o que realmente importa.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Consistência sem esforço</strong>
          <p>A sua presença continua ativa, mesmo nos dias em que não tem espaço mental.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Decisões já tomadas</strong>
          <p>Abre, copia, publica. O que publicar hoje já está decidido.</p>
        </div>
      </section>

      <section className="aa2-brand-section" id="marca">
        <div className="aa2-editorial-title">
          <p className="aa2-kicker">Agenda Ativa™</p>
          <h2>Não é mais uma ferramenta.<br />É uma preocupação a menos.</h2>
        </div>
        <div className="aa2-definition">
          <div className="aa2-definition-card dark">
            <h3>Não vendemos IA.</h3>
            <h3>Não vendemos prompts.</h3>
            <h3>Não vendemos calendários editoriais.</h3>
          </div>
          <div className="aa2-definition-card">
            <p>Vendemos tempo recuperado, consistência, clareza e decisões já tomadas.</p>
            <p className="aa2-signature">Hoje já está tratado.</p>
          </div>
        </div>
      </section>

      <section className="aa2-steps" id="funciona">
        <p className="aa2-kicker">Três passos. Zero complicação.</p>
        <div className="aa2-step-grid">
          <article><span>01</span><strong>Escolha</strong><p>A edição criada para a sua profissão.</p></article>
          <article><span>02</span><strong>Copie</strong><p>O conteúdo já preparado para publicar.</p></article>
          <article><span>03</span><strong>Publique</strong><p>E mantenha a sua comunicação ativa.</p></article>
        </div>
      </section>

      <section className="aa2-preview">
        <div>
          <p className="aa2-kicker">Experiência Agenda Ativa™</p>
          <h2>Uma única decisão:<br /><em>publicar o conteúdo que já está pronto.</em></h2>
          <p>Por trás existe método. Para o utilizador existe simplicidade.</p>
        </div>
        <div className="aa2-preview-card">
          <small>Hoje · Dia 12</small>
          <h3>O conteúdo de hoje já está preparado.</h3>
          <button type="button">Copiar</button>
        </div>
      </section>

      <section className="aa2-editions" id="edicoes">
        <div className="aa2-editorial-title center">
          <p className="aa2-kicker">Edições disponíveis</p>
          <h2>Existe uma Agenda Ativa™ para a sua profissão.</h2>
        </div>

        <div className="aa2-edition-grid">
          {editions.map((edition) => (
            <article className={`aa2-edition-card ${edition.key}`} key={edition.name}>
              <div className="aa2-edition-image"><img src={edition.image} alt="" /></div>
              <div className="aa2-edition-copy">
                <small>{edition.status} · {edition.accent}</small>
                <h3>{edition.name}</h3>
                <p>{edition.description}</p>
                <a href={edition.href}>{edition.status === "Disponível" ? "Explorar edição" : "Ver em breve"} <span>→</span></a>
              </div>
            </article>
          ))}
        </div>

        <div className="aa2-upcoming">
          {upcoming.map((item) => <span key={item}>{item} · Brevemente</span>)}
        </div>
      </section>

      <section className="aa2-final">
        <img src="/aa-monogram-official.svg" alt="" />
        <p>AGENDA ATIVA<sup>™</sup></p>
        <h2>Menos tempo a criar conteúdo.<br />Mais tempo para trabalhar.</h2>
        <a className="aa2-btn" href="#edicoes">Ver edições</a>
      </section>

      <footer className="aa2-footer">
        <span>Agenda Ativa™</span>
        <span>Hoje já está tratado.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
