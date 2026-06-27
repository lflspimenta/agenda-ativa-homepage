import { sendMagicLink } from "./actions";
import { LoginSessionHandler } from "./login-session-handler";

type LoginPageProps = {
  searchParams?: {
    estado?: string;
    produto?: string;
    area?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const status = searchParams?.estado;
  const customerArea = searchParams?.area === "1";
  const product =
    searchParams?.produto === "imobiliario" ? "imobiliario" : "wedding";
  const edition = customerArea
    ? "Área do cliente"
    : product === "imobiliario" ? "Edição Imobiliário" : "Wedding Planner Edition";

  return (
    <main className="page">
      <LoginSessionHandler />
      <header>
        <div>
          <div className="brand">AGENDA ATIVA™</div>
          <div className="edition">{edition}</div>
        </div>
      </header>

      <section className="hero-message" aria-label="Entrada">
        <h1>Entre na sua agenda.</h1>
      </section>

      <form className="login-card" action={sendMagicLink}>
        <input type="hidden" name="produto" value={product} />
        <input type="hidden" name="area" value={customerArea ? "1" : "0"} />
        <label htmlFor="email">Email de acesso</label>
        <input id="email" name="email" type="email" required placeholder="o-seu-email@exemplo.com" />
        <button className="login-button" type="submit">Receber acesso</button>

        {status === "enviado" ? (
          <p className="status-message">Enviamos o link para o seu email. Abra-o para entrar.</p>
        ) : null}
        {status === "erro" ? (
          <p className="status-message">Nao foi possivel enviar ou confirmar o link. Tente novamente.</p>
        ) : null}
        {status === "sem_acesso" ? (
          <p className="status-message">Este email ainda nao tem acesso ativo a Agenda Ativa.</p>
        ) : null}
        {status === "email" ? (
          <p className="status-message">Escreva o email usado na compra.</p>
        ) : null}
      </form>
    </main>
  );
}
