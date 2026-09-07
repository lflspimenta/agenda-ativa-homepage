import type { Edition360Config } from "@/lib/edition-360";

export const medicinaEstetica360Config: Edition360Config = {
  product: "medicina_estetica",
  template: "agenda-medicina-estetica-360-teste.html",
  testLimitEnv: "MEDICINA_ESTETICA_360_TEST_LIMIT",
  previewFirstName: "Sofia",
  greetingCandidates: ["Olá, Sofia", "Olá, Ana", "Olá, Luís"],
  plainGreeting: true
};
