import { readFile, writeFile } from "node:fs/promises";

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error("Indique o HTML de origem e o destino.");

let html = await readFile(sourcePath, "utf8");

const css = `
    /* Extensão 360 experimental: visível exclusivamente no final do Dia 30 */
    .completed-blocks { display:none; margin-bottom:7px; color:var(--rose); font-size:10px; font-weight:600; letter-spacing:.06em; }
    .continuation-panel { display:none; margin:0 0 28px; border:1px solid var(--line); border-top:3px solid var(--rose); border-radius:6px; background:var(--surface); box-shadow:0 12px 32px rgba(31,49,59,.07); overflow:hidden; }
    .continuation-panel.show { display:block; }
    .continuation-main { padding:28px 24px 24px; }
    .continuation-eyebrow { margin-bottom:10px; color:var(--rose); font-size:10px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; }
    .continuation-title { margin-bottom:10px; color:var(--ink); font-family:var(--serif); font-size:30px; font-weight:400; line-height:1.1; }
    .continuation-copy { margin-bottom:20px; color:var(--muted); font-size:13px; line-height:1.65; }
    .continuation-button { width:100%; min-height:52px; border:0; border-radius:6px; background:var(--ink); color:#fff; cursor:default; font-family:var(--sans); font-size:12px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; }
    .future-library { padding:20px 24px 22px; border-top:1px solid var(--line); background:var(--rose-dim); }
    .future-library-label { margin-bottom:12px; color:var(--muted); font-size:9.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }
    .future-library-list { display:grid; grid-template-columns:1fr; gap:8px; list-style:none; }
    .future-library-list li { color:var(--muted); font-size:11px; letter-spacing:.03em; }
    @media(min-width:768px) { .future-library-list { grid-template-columns:1fr 1fr; } }
    @media(min-width:1100px) { .continuation-main { padding:30px 28px 26px; } .future-library { padding:22px 28px 24px; } }
`;

const continuation = `
  <section class="continuation-panel" id="continuationPanel" aria-labelledby="continuationTitle">
    <div class="continuation-main">
      <div class="continuation-eyebrow">Continuação da sua agenda</div>
      <h2 class="continuation-title" id="continuationTitle">Quer continuar?</h2>
      <p class="continuation-copy" id="continuationCopy">Tem mais 30 conteúdos estratégicos preparados para continuar a sua presença ativa.</p>
      <button class="continuation-button" id="continuationButton" type="button" aria-disabled="true">Desbloquear próximos 30 conteúdos</button>
    </div>
    <div class="future-library">
      <div class="future-library-label">Continuação</div>
      <ul class="future-library-list">
        <li id="nextBlockState">🔒 Conteúdos 31–60</li>
      </ul>
    </div>
  </section>
`;

html = html.replace("  </style>", `${css}\n  </style>`);
html = html.replace("  <footer class=\"footer\">", `${continuation}\n  <footer class=\"footer\">`);
html = html.replace(
  '    <div class="progress-header">',
  '    <div class="completed-blocks" id="completedBlocks"></div>\n    <div class="progress-header">'
);
html = html.replace(/const DAYS=\[[\s\S]*?\n\];\n\nlet currentDay/, "const DAYS=__UNLOCKED_CONTENTS__;\nconst ACCESS_LIMIT=__ACCESS_LIMIT__;\n\nlet currentDay");
html = html.replace("      renderDay(1);", "      const requestedDay = Number(new URLSearchParams(window.location.search).get(\"dia\"));\n      renderDay(Number.isInteger(requestedDay) && requestedDay >= 1 && requestedDay <= ACCESS_LIMIT ? requestedDay : 1);");
html = html.replace("  currentDay = n;", "  currentDay = n;\n  const dayInBlock = ((n - 1) % 30) + 1;");
html = html.replace(
  'document.getElementById("navPill").textContent = "Dia " + n + " de 30";',
  'document.getElementById("navPill").textContent = "Conteúdo " + n + " de " + ACCESS_LIMIT;'
);
html = html.replace(
  'document.getElementById("progressCount").textContent = "Dia " + n + " de 30";',
  'document.getElementById("progressCount").textContent = "Dia " + dayInBlock + " de 30";'
);
html = html.replace(
  '  // Progress bar\n  document.getElementById("pFill")',
  '  const blockStart = n - dayInBlock + 1;\n  const blockEnd = blockStart + 29;\n  document.querySelector(".progress-label").textContent = "Conteúdos " + blockStart + "–" + blockEnd;\n  const completedBlocks = document.getElementById("completedBlocks");\n  if (completedBlocks) {\n    const completedEnd = blockStart - 1;\n    completedBlocks.textContent = completedEnd > 0 ? "✓ Conteúdos 1–" + completedEnd + " concluídos" : "";\n    completedBlocks.style.display = completedEnd > 0 ? "block" : "none";\n  }\n\n  // Progress bar\n  document.getElementById("pFill")'
);
html = html.replace('(n / 30 * 100)', '(dayInBlock / 30 * 100)');
html = html.replace('i + 1 < n ? " done" : i + 1 === n', 'i + 1 < dayInBlock ? " done" : i + 1 === dayInBlock');
html = html.replace(
  `  const nextCard = document.querySelector(".next-card");
  if (next && nextCard) {
    document.getElementById("nextLabel").textContent = "Próximo — Dia " + (n + 1);
    document.getElementById("nextTopic").textContent = next.title;
    nextCard.style.display = "";
    nextCard.style.cursor = "pointer";
    nextCard.onclick = () => { renderDay(n + 1); window.scrollTo({top:0,behavior:"smooth"}); };
  } else if (nextCard) {
    nextCard.style.display = "none";
  }`,
  `  const nextCards = document.querySelectorAll(".next-card, .next-sidebar");
  if (next && n % 30 !== 0) {
    document.querySelectorAll(".next-label").forEach(el => { el.textContent = "Próximo — Dia " + (dayInBlock + 1); });
    document.querySelectorAll(".next-topic").forEach(el => { el.textContent = next.title; });
    document.querySelectorAll(".next-pilar").forEach(el => { el.textContent = next.pilar || "Estratégia"; });
    nextCards.forEach(nextCard => {
      nextCard.style.display = "";
      nextCard.style.cursor = "pointer";
      nextCard.onclick = () => { renderDay(n + 1); window.scrollTo({top:0,behavior:"smooth"}); };
    });
  } else {
    nextCards.forEach(nextCard => { nextCard.style.display = "none"; });
  }`
);
html = html.replace(
  "  // Next day\n  const next = DAYS.find(x => x.num === n + 1);",
  `  // Continuação: apenas nos finais de bloco e nunca depois do conteúdo 360.
  const continuationPanel = document.getElementById("continuationPanel");
  const hasAcquiredNextBlock = n % 30 === 0 && n < ACCESS_LIMIT;
  const isAcquiredLimit = n % 30 === 0 && n === ACCESS_LIMIT && n < 360;
  const showContinuation = hasAcquiredNextBlock || isAcquiredLimit;
  if (continuationPanel) continuationPanel.classList.toggle("show", showContinuation);

  if (showContinuation) {
    const nextStart = n + 1;
    const nextEnd = Math.min(n + 30, 360);
    const title = document.getElementById("continuationTitle");
    const copy = document.getElementById("continuationCopy");
    const button = document.getElementById("continuationButton");
    const blockState = document.getElementById("nextBlockState");
    if (hasAcquiredNextBlock) {
      title.textContent = "Os seus próximos conteúdos já estão disponíveis";
      copy.textContent = "Agora pode avançar para os seus novos 30 conteúdos.";
      button.textContent = "Avançar para os próximos 30 conteúdos";
      button.removeAttribute("aria-disabled");
      button.onclick = () => { renderDay(nextStart); window.scrollTo({top:0,behavior:"smooth"}); };
      blockState.textContent = "Conteúdos " + nextStart + "–" + nextEnd + " disponíveis";
    } else {
      title.textContent = "Quer continuar?";
      copy.textContent = "Tem mais 30 conteúdos estratégicos preparados para continuar a sua presença ativa.";
      button.textContent = "Desbloquear próximos 30 conteúdos";
      button.setAttribute("aria-disabled", "true");
      button.onclick = null;
      blockState.textContent = "🔒 Conteúdos " + nextStart + "–" + nextEnd;
    }
  }

  // Next day
  const next = DAYS.find(x => x.num === n + 1);`
);

if (html.includes("const DAYS=[") || !html.includes("__UNLOCKED_CONTENTS__") || !html.includes("__ACCESS_LIMIT__") || !html.includes("continuationPanel")) {
  throw new Error("Não foi possível gerar o template experimental com segurança.");
}

await writeFile(outputPath, html, "utf8");
console.log(`Template experimental criado: ${outputPath}`);
