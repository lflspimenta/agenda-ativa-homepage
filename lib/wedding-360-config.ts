import type { Edition360Config } from "@/lib/edition-360";

export const wedding360Config: Edition360Config = {
  product: "wedding",
  template: "agenda-wedding-360.html",
  testLimitEnv: "WEDDING_360_TEST_LIMIT",
  previewFirstName: "Ana",
  greetingCandidates: ["Olá, Ana", "Olá, Sofia", "Olá, Luís"]
};
