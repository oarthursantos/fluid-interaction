export function validateCEP(cep: string): boolean {
  cep = cep.replace(/\s|-/g, "");

  const cepPattern = /^\d{8}$/;

  return cepPattern.test(cep);
}
