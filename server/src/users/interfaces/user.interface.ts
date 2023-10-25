export interface User {
  // personal data
  id?: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  cpf: string;

  // shipping data
  address: Address;

  // contact data
  contactDetails: ContactDetails;

  // account data
  email: string;
  password: string;
}

export type Gender = 'Masculino' | 'Feminino' | 'Outros';

export type Address = {
  name: string;
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  referencePoint: string;
};

export type ContactDetails = {
  landline: string;
  mobile: string;
};
