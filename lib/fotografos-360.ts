import "server-only";
import contents from "@/private/fotografos-360.json";

export type FotografosContent = (typeof contents)[number];

export const FOTOGRAFOS_TOTAL_CONTENTS = 360;
export const FOTOGRAFOS_CONTENTS_PER_BLOCK = 30;
export const FOTOGRAFOS_DEFAULT_ACCESS_LIMIT = 30;

if (contents.length !== FOTOGRAFOS_TOTAL_CONTENTS) {
  throw new Error(`Biblioteca Fotógrafos 360 inválida: ${contents.length} conteúdos.`);
}

export function isValidFotografosAccessLimit(limit: number) {
  return Number.isInteger(limit) &&
    limit >= FOTOGRAFOS_CONTENTS_PER_BLOCK &&
    limit <= FOTOGRAFOS_TOTAL_CONTENTS &&
    limit % FOTOGRAFOS_CONTENTS_PER_BLOCK === 0;
}

export function getFotografosAccessLimit(products: unknown) {
  if (!Array.isArray(products) || !products.includes("fotografos")) return 0;

  const limits = products
    .filter((product): product is string => typeof product === "string")
    .map((product) => product.match(/^fotografos:(\d+)$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter(isValidFotografosAccessLimit);

  return limits.length ? Math.max(...limits) : FOTOGRAFOS_DEFAULT_ACCESS_LIMIT;
}

export function isFotografosContentUnlocked(number: number, accessLimit: number) {
  return Number.isInteger(number) && number >= 1 && number <= accessLimit;
}

export function getUnlockedFotografosContents(accessLimit: number) {
  if (!isValidFotografosAccessLimit(accessLimit)) return [];
  return contents.slice(0, accessLimit);
}

export function getUnlockedFotografosContent(number: number, accessLimit: number) {
  if (!isFotografosContentUnlocked(number, accessLimit)) return null;
  return contents[number - 1] ?? null;
}
