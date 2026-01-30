import { productDTO } from './productDTO.js';

export const getAllProductsResDTO = ({ items, pagination }) => {
  return {
    // fix: forma curta: items.map(productDTO)
    items: items.map((product) => productDTO(product)),
    pagination: {
      totalPages: pagination.totalPages,
    },
  };
};
