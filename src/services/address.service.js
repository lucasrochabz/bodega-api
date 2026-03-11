import { AddressErrors } from '../errors/addressErrors.js';

export const addressService = {
  getAddress: async (postalCode) => {
    const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json`);

    if (!response.ok) {
      throw AddressErrors.VIA_CEP_UNAVAILABLE;
    }

    const json = await response.json();

    if (json.erro) {
      throw AddressErrors.INVALID_CEP;
    }

    const address = {
      street: json.logradouro,
      neighborhood: json.bairro,
      city: json.localidade,
      state: json.uf,
    };

    return address;
  },
};
