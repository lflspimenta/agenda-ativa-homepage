import type { Edition360Config } from "@/lib/edition-360";

const commonGreetings = ["Olá, Sofia", "Olá, Ana", "Olá, Luís"];

export const esteticaFacial360Config: Edition360Config = {
  product: "estetica_facial",
  template: "agenda-estetica-facial-360.html",
  testLimitEnv: "ESTETICA_FACIAL_360_TEST_LIMIT",
  previewFirstName: "Sofia",
  greetingCandidates: commonGreetings
};

export const psicologos360Config: Edition360Config = {
  product: "psicologos",
  template: "agenda-psicologos-360.html",
  testLimitEnv: "PSICOLOGOS_360_TEST_LIMIT",
  previewFirstName: "Ana",
  greetingCandidates: commonGreetings,
  plainGreeting: true
};

export const unhas360Config: Edition360Config = {
  product: "unhas",
  template: "agenda-unhas-360.html",
  testLimitEnv: "UNHAS_360_TEST_LIMIT",
  previewFirstName: "Ana",
  greetingCandidates: commonGreetings,
  plainGreeting: true
};

export const advogados360Config: Edition360Config = {
  product: "advogados",
  template: "agenda-advogados-360.html",
  testLimitEnv: "ADVOGADOS_360_TEST_LIMIT",
  previewFirstName: "Luís",
  greetingCandidates: commonGreetings,
  plainGreeting: true
};
