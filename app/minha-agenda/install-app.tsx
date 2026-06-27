"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallApp() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isSamsungInternet, setIsSamsungInternet] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setIsSamsungInternet(/samsungbrowser/i.test(navigator.userAgent));
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);

    const capture = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  if (isInstalled) {
    return <p className="install-status">A Agenda Ativa já está instalada.</p>;
  }

  if (prompt && isSamsungInternet) {
    return (
      <div>
        <p className="install-help">
          No Samsung Internet, o Android pode mostrar um aviso incorreto de
          aplicação antiga. Para instalar sem esse aviso, abra esta página no
          Chrome. Se não tiver Chrome, pode continuar no Samsung.
        </p>
        <button
          className="install-button"
          onClick={async () => {
            await prompt.prompt();
            await prompt.userChoice;
            setPrompt(null);
          }}
        >
          Instalar mesmo assim
        </button>
      </div>
    );
  }

  if (prompt) {
    return (
      <button
        className="install-button"
        onClick={async () => {
          await prompt.prompt();
          await prompt.userChoice;
          setPrompt(null);
        }}
      >
        Adicionar ao ecrã inicial
      </button>
    );
  }

  if (isIos) {
    return (
      <p className="install-help">
        No iPhone: toque em <strong>Partilhar</strong> e depois em{" "}
        <strong>Adicionar ao ecrã principal</strong>.
      </p>
    );
  }

  if (isSamsungInternet) {
    return (
      <p className="install-help">
        Para instalar sem avisos, abra esta página no Chrome. Também pode
        continuar a utilizar normalmente no Samsung Internet.
      </p>
    );
  }

  return (
    <p className="install-help">
      Abra o menu do navegador e escolha “Adicionar ao ecrã inicial”.
    </p>
  );
}
