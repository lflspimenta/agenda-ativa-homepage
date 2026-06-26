import { LoginSessionHandler } from "../entrar/login-session-handler";

export default function ImobiliarioLandingPage() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_IMOBILIARIO_LINK ?? "#";

  return (
    <main className="landing">
      <LoginSessionHandler />

      <section className="landing-hero" aria-label="Agenda Ativa Imobiliário">
        <div className="landing-hero-mobile">
          <div className="landing-mobile-brand">
            <div className="landing-mobile-logo">AGENDA ATIVA™</div>
            <div className="landing-mobile-edition">
              <span />Edição Imobiliário<span />
            </div>
          </div>

          <div className="landing-mobile-copy">
            <h1>
              Continue focado
              <br />
              nos clientes.
              <em>
                O Instagram
                <br />
                continua ativo.
              </em>
            </h1>

            <p>
              Mais tempo para os seus clientes.
              <strong>Menos tempo a pensar no que publicar.</strong>
            </p>

            <div className="landing-mobile-mantra">Abra. Copie. Publique.</div>

            <div className="landing-mobile-price">
              <strong>97€</strong>
              <span>
                <b>Pagamento único</b>
                Sem mensalidades.
                <br />
                Sem subscrições.
                <br />
                Acesso imediato.
              </span>
            </div>

            <a className="landing-cta landing-mobile-cta" href={stripePaymentLink}>
              QUERO A MINHA AGENDA ATIVA™
            </a>
          </div>
        </div>
      </section>

      <section className="landing-strip">
        <div className="landing-strip-title">
          O Instagram não pode parar.
          <br />
          <em>Mesmo quando está ocupado a fechar negócios.</em>
        </div>
        <div className="landing-strip-icons">
          <div><span>01</span>Tempo recuperado</div>
          <div><span>02</span>Consistência sem esforço</div>
          <div><span>03</span>Pronto a publicar</div>
        </div>
      </section>

      <section className="landing-section">
        <h2>Três passos.<em>Zero complicação.</em></h2>
        <div className="steps-flow">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Escolha o dia</h3>
            <p>Abra a Agenda Ativa™ e veja o conteúdo pronto para hoje.</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Copie</h3>
            <p>Copie a legenda e o call to action num só clique.</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Publique</h3>
            <p>Cole no Instagram e mantenha a presença ativa.</p>
          </div>
        </div>
      </section>

      <section className="landing-preview">
        <div className="preview-title">
          Uma única decisão:<br />
          <em>publicar o conteúdo que já está pronto.</em>
        </div>
        <div className="preview-card">
          <small>Hoje · Dia 04</small>
          <p>3 erros que os compradores cometem ao escolher o primeiro imóvel.</p>
          <div className="mini-copy">Copiar</div>
        </div>
      </section>

      <section className="landing-section landing-receive">
        <div className="receive-grid">
          <h2>O que recebe</h2>
          <div className="receive-list">
            <div><span>✓</span>30 dias de conteúdo prontos a publicar</div>
            <div><span>✓</span>Legendas preparadas</div>
            <div><span>✓</span>Call to action incluída</div>
            <div><span>✓</span>Menos de 5 minutos por dia</div>
            <div><span>✓</span>Acesso imediato</div>
          </div>
        </div>
      </section>

      <section className="landing-authority">
        <h2>Criado para consultores imobiliários cuja prioridade não é o Instagram.</h2>
        <p>Para quem precisa de presença consistente sem transformar o conteúdo em mais uma tarefa pesada.</p>
      </section>

      <section className="landing-emotion">
        <div>
          <h2>Não está a comprar conteúdo.<em>Está a recuperar tempo.</em></h2>
          <p>Enquanto acompanha clientes, visita imóveis e fecha negócios, a Agenda Ativa™ mantém a sua presença online ativa sem lhe roubar tempo nem energia mental.</p>
        </div>
        <div></div>
      </section>

      <section className="landing-objection">
        <div>
          <h2>E se outros consultores comprarem?<em>O seu conteúdo continua único.</em></h2>
          <p>A Agenda Ativa™ fornece a ideia e a estrutura. A identidade final vem sempre do seu trabalho real.</p>
        </div>
        <ul>
          <li>As fotografias continuam a ser suas.</li>
          <li>Os imóveis continuam a ser seus.</li>
          <li>Os clientes continuam a ser seus.</li>
          <li>A sua marca continua a ser sua.</li>
        </ul>
      </section>

      <section className="landing-real-example">
        <div className="real-example-copy">
          <span>Exemplo real</span>
          <h2>Exemplo real do que vai receber</h2>
        </div>
        <article className="real-example-card">
          <small>Dia 04</small>
          <h3>3 erros que os compradores cometem ao escolher o primeiro imóvel.</h3>
          <div>
            <strong>Trecho da legenda:</strong>
            <p>Comprar o primeiro imóvel é uma das maiores decisões financeiras da vida. Antes de decidir, confirme localização, estado do imóvel, encargos reais e margem de negociação disponível.</p>
          </div>
          <div>
            <strong>CTA:</strong>
            <p>Guarde este post para partilhar com clientes em fase de decisão.</p>
          </div>
        </article>
      </section>

      <section className="price-section" id="comprar">
        <h2>Pronto para ter o Instagram sob controlo?</h2>
        <p>Pagamento único. Sem mensalidades. Sem subscrições. Acesso imediato.</p>
        <div className="price-card">
          <div className="price-value-title">O que recebe hoje</div>
          <div className="price-includes">
            <div><span>✓</span>30 dias de conteúdo prontos a publicar</div>
            <div><span>✓</span>Legendas preparadas</div>
            <div><span>✓</span>CTA incluída</div>
            <div><span>✓</span>Menos de 5 minutos por dia</div>
            <div><span>✓</span>Acesso imediato</div>
          </div>
          <p>Pagamento único. Sem mensalidades. Sem subscrições.</p>
          <a className="landing-cta" href={stripePaymentLink}>
            QUERO A MINHA AGENDA ATIVA™ →
          </a>
        </div>
      </section>

      <section className="landing-faq" aria-label="Perguntas frequentes">
        <h2>Perguntas frequentes</h2>
        <div className="faq-list">
          <div><h3>Recebo acesso quando?</h3><p>Imediatamente após a compra.</p></div>
          <div><h3>Preciso de usar ChatGPT?</h3><p>Não. A Agenda Ativa™ já vem pronta a usar.</p></div>
          <div><h3>Preciso de criar conteúdo?</h3><p>Não. Só precisa de copiar, adaptar se quiser, e publicar.</p></div>
          <div><h3>É uma subscrição?</h3><p>Não. É pagamento único.</p></div>
          <div><h3>Posso usar com as minhas próprias fotografias?</h3><p>Sim. O conteúdo ganha força quando é publicado com imagens reais do seu trabalho.</p></div>
        </div>
      </section>

      <section className="landing-final">
        <p>Continue focado nos clientes. O Instagram continua ativo.</p>
        <a className="landing-cta" href={stripePaymentLink}>
          QUERO A MINHA AGENDA ATIVA™ →
        </a>
        <small>Acesso imediato após compra.</small>
      </section>
    </main>
  );
}
