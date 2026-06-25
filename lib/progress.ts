const DAY_MS = 24 * 60 * 60 * 1000;

export function getCurrentDay(purchaseDate: string | Date) {
  const purchasedAt = new Date(purchaseDate);
  const now = new Date();

  const start = Date.UTC(
    purchasedAt.getUTCFullYear(),
    purchasedAt.getUTCMonth(),
    purchasedAt.getUTCDate()
  );

  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const daysSincePurchase = Math.max(0, Math.floor((today - start) / DAY_MS));

  return Math.min(30, daysSincePurchase + 1);
}

export function getUpcomingDays(currentDay: number) {
  return [1, 2, 3]
    .map((offset) => currentDay + offset)
    .filter((day) => day <= 30)
    .map((day, index) => ({
      day,
      label: index === 0 ? "Disponível amanhã" : `Disponível em ${index + 1} dias`
    }));
}
