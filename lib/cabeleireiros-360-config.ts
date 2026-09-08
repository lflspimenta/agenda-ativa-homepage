import type { Edition360Config } from "@/lib/edition-360";

export const cabeleireiros360Config: Edition360Config = {
  product: "cabeleireiros",
  template: "agenda-cabeleireiros-360.html",
  testLimitEnv: "CABELEIREIROS_360_TEST_LIMIT",
  previewFirstName: "Ana",
  greetingCandidates: ["Olá, Ana", "Olá, Luís", "Olá, Sofia"],
  plainGreeting: true
};
