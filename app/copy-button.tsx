"use client";

import { useState } from "react";

type CopyButtonProps = {
  title: string;
  body: string;
  cta: string;
};

export function CopyButton({ title, body, cta }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyContent() {
    const text = `${title}\n\n${body}\n\n${cta}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <button
      className={`copy-button${copied ? " copied" : ""}`}
      type="button"
      onClick={copyContent}
    >
      {copied ? "Conteúdo copiado" : "Copiar conteúdo"}
    </button>
  );
}
