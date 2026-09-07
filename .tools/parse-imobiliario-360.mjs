import { readFile, writeFile } from "node:fs/promises";

const [sourcePath, outputPath] = process.argv.slice(2);

if (!sourcePath || !outputPath) {
  throw new Error("Uso: node .tools/parse-imobiliario-360.mjs <master.md> <output.json>");
}

const source = (await readFile(sourcePath, "utf8")).replace(/\r\n/g, "\n");
const heading = /^\s*(?:\\?###\s*)DIA\s+(\d+)\s+---\s*(.*)$/gim;
const matches = [...source.matchAll(heading)];

function plain(value) {
  return value
    .replace(/^\s*-{8,}\s*$/gm, "")
    .replace(/\\\n/g, "\n")
    .replace(/\\$/gm, "")
    .replace(/\\([#*_])/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function field(section, label, nextLabels) {
  const flexibleLabel = label.split(" ").join("\\s+");
  const next = nextLabels.map((item) => item.split(" ").join("\\s+")).join("|");
  const expression = new RegExp(
    `\\*\\*${flexibleLabel}\\s*:?[\\s]*\\*\\*\\s*:?[\\s]*([\\s\\S]*?)(?=\\n\\s*\\*\\*(?:${next})\\s*:?[\\s]*\\*\\*|$)`,
    "i"
  );
  return plain(section.match(expression)?.[1] ?? "");
}

const contents = matches.map((match, index) => {
  const number = Number(match[1]);
  const start = match.index + match[0].length;
  const end = matches[index + 1]?.index ?? source.length;
  const section = source.slice(start, end);
  const pilarMarker = section.search(/\*\*Pilar\s+oficial:\s*\*\*/i);
  const title = plain([match[2], pilarMarker >= 0 ? section.slice(0, pilarMarker) : ""].join("\n")).replace(
    /\s*\n+\s*/g,
    " "
  );

  return {
    number,
    title,
    pilar: field(section, "Pilar oficial", ["Tema vertical"]),
    theme: field(section, "Tema vertical", ["Gatilho", "Formato COS"]),
    trigger: field(section, "Gatilho", ["Formato COS"]),
    format: field(section, "Formato COS", ["Objetivo estratégico"]),
    objective: field(section, "Objetivo estratégico", ["Legenda"]),
    caption: field(section, "Legenda", ["CTA"]),
    cta: field(section, "CTA", ["Resultado esperado"]),
    expectedResult: field(section, "Resultado esperado", ["Pilar oficial"])
  };
});

const numbers = contents.map(({ number }) => number);
const missing = Array.from({ length: 360 }, (_, index) => index + 1).filter(
  (number) => !numbers.includes(number)
);
const invalid = contents.filter((content) =>
  ["title", "pilar", "theme", "format", "objective", "caption", "cta", "expectedResult"].some(
    (key) => !content[key]
  )
);

if (contents.length !== 360 || new Set(numbers).size !== 360 || missing.length || invalid.length) {
  throw new Error(
    JSON.stringify(
      {
        parsed: contents.length,
        unique: new Set(numbers).size,
        missing,
        invalid: invalid.map(({ number }) => number)
      },
      null,
      2
    )
  );
}

await writeFile(outputPath, `${JSON.stringify(contents, null, 2)}\n`, "utf8");
console.log(`Importados ${contents.length} conteúdos (${contents[0].number}–${contents.at(-1).number}).`);
