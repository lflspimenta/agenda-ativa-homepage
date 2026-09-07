import "server-only";
import contents from "@/private/imobiliario-360.json";

export type ImobiliarioContent = (typeof contents)[number];

export const TOTAL_CONTENTS = 360;
export const TOTAL_CYCLES = 12;
export const CONTENTS_PER_CYCLE = 30;
export const DEFAULT_ACCESS_LIMIT = 30;

if (contents.length !== TOTAL_CONTENTS) {
  throw new Error(`Biblioteca Imobiliário 360 inválida: ${contents.length} conteúdos.`);
}

export function getCycleForContent(number: number) {
  return Math.ceil(number / CONTENTS_PER_CYCLE);
}

export function isValidAccessLimit(limit: number) {
  return (
    Number.isInteger(limit) &&
    limit >= CONTENTS_PER_CYCLE &&
    limit <= TOTAL_CONTENTS &&
    limit % CONTENTS_PER_CYCLE === 0
  );
}

export function getAccessLimit(products: unknown) {
  if (!Array.isArray(products) || !products.includes("imobiliario")) return 0;

  const limits = products
    .filter((product): product is string => typeof product === "string")
    .map((product) => product.match(/^imobiliario:(\d+)$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter(isValidAccessLimit);

  return limits.length ? Math.max(...limits) : DEFAULT_ACCESS_LIMIT;
}

export function isContentUnlocked(number: number, accessLimit: number) {
  return Number.isInteger(number) && number >= 1 && number <= accessLimit;
}

export function getUnlockedContents(accessLimit: number) {
  if (!isValidAccessLimit(accessLimit)) return [];
  return contents.slice(0, accessLimit);
}

export function getUnlockedContent(number: number, accessLimit: number) {
  if (!isContentUnlocked(number, accessLimit)) return null;
  return contents[number - 1] ?? null;
}
