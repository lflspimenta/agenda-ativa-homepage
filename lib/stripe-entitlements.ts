export const CONTENT_LIMIT_STEP = 30;
export const CONTENT_LIMIT_MAX = 360;

export function isValidContentLimit(value: number) {
  return (
    Number.isInteger(value) &&
    value >= CONTENT_LIMIT_STEP &&
    value <= CONTENT_LIMIT_MAX &&
    value % CONTENT_LIMIT_STEP === 0
  );
}

export function getProductAccessLimit(products: unknown, product: string) {
  if (!Array.isArray(products) || !products.includes(product)) return 0;

  const escapedProduct = product.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markerPattern = new RegExp(`^${escapedProduct}:(\\d+)$`);
  const limits = products
    .filter((value): value is string => typeof value === "string")
    .map((value) => markerPattern.exec(value)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number)
    .filter(isValidContentLimit);

  return limits.length ? Math.max(...limits) : CONTENT_LIMIT_STEP;
}

export function setProductAccessLimit(
  products: unknown,
  product: string,
  requestedLimit: number
) {
  if (!isValidContentLimit(requestedLimit)) {
    throw new Error("Invalid content access limit");
  }

  const currentProducts = Array.isArray(products)
    ? products.filter((value): value is string => typeof value === "string")
    : [];
  const currentLimit = getProductAccessLimit(currentProducts, product);
  const targetLimit = Math.max(currentLimit, requestedLimit);
  const markerPrefix = `${product}:`;
  const preserved = currentProducts.filter(
    (value) => value !== product && !value.startsWith(markerPrefix)
  );

  return [...new Set([...preserved, product, `${product}:${targetLimit}`])];
}
