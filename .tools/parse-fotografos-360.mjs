import { readFile, writeFile } from "node:fs/promises";

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) {
  throw new Error("Uso: node .tools/parse-fotografos-360.mjs <master.md> <output.json>");
}

const source = (await readFile(sourcePath, "utf8")).replace(/\r\n/g, "\n");
const heading = /^## Conteúdo (\d+)\s*$/gim;
const matches = [...source.matchAll(heading)];

function plain(value) {
  return value
    .replace(/\\\n/g, "\n")
    .replace(/\\$/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function field(section, label, nextLabels) {
  const next = nextLabels.map((item) => item.replace(/ /g, "\\s+")).join("|");
  const expression = new RegExp(
    `\\*\\*${label.replace(/ /g, "\\s+")}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*(?:${next}):\\*\\*|$)`,
    "i"
  );
  return plain(section.match(expression)?.[1] ?? "");
}

const contents = matches.map((match, index) => {
  const number = Number(match[1]);
  const start = match.index + match[0].length;
  const end = matches[index + 1]?.index ?? source.length;
  const section = source.slice(start, end).replace(/\n# BLOCO[\s\S]*$/i, "");

  return {
    number,
    title: field(section, "Título", ["Legenda"]),
    pilar: field(section, "Pilar", ["Objetivo"]),
    trigger: field(section, "Gatilho", ["Formato"]),
    format: field(section, "Formato", ["Título"]),
    objective: field(section, "Objetivo", ["Gatilho"]),
    caption: field(section, "Legenda", ["CTA"]),
    cta: field(section, "CTA", ["Resultado Esperado"]),
    expectedResult: field(section, "Resultado Esperado", ["Pilar"])
  };
});

const numbers = contents.map(({ number }) => number);
const missing = Array.from({ length: 360 }, (_, index) => index + 1).filter(
  (number) => !numbers.includes(number)
);
const fields = ["title", "pilar", "trigger", "format", "objective", "caption", "cta", "expectedResult"];
const invalid = contents.filter((content) => fields.some((key) => !content[key]));

if (contents.length !== 360 || new Set(numbers).size !== 360 || missing.length || invalid.length) {
  throw new Error(JSON.stringify({
    parsed: contents.length,
    unique: new Set(numbers).size,
    missing,
    invalid: invalid.map(({ number }) => number)
  }, null, 2));
}

await writeFile(outputPath, `${JSON.stringify(contents, null, 2)}\n`, "utf8");
console.log(`Importados ${contents.length} conteúdos (${contents[0].number}–${contents.at(-1).number}).`);
