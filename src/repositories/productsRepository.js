import executeQuery from '../helpers/databaseQuery.js';

export const productsRepository = {
  findAll: async ({ pageNumber, pageSizeNumber }) => {
    const offset = (pageNumber - 1) * pageSizeNumber;

    const countQuery = `
      SELECT COUNT(*)
      AS total
      FROM products
    `;
    const countErrorMessage = 'Erro ao contar produtos no Banco de Dados';

    const countResults = await executeQuery(countQuery, countErrorMessage);
    const totalProducts = countResults[0].total;
    const totalPages = Math.ceil(totalProducts / pageSizeNumber);

    const fetchQuery = `
      SELECT id, name, price, description, image_path
      FROM products
      LIMIT ? OFFSET ?
    `;
    const params = [pageSizeNumber, offset];

    const errorMessage = 'Erro ao buscar produtos no Banco de Dados';

    const results = await executeQuery(fetchQuery, params, errorMessage);
    return { results, totalPages };
  },

  findByProductId: async (productID) => {
    const query = `
      SELECT id, name, price, description, stock, status, image_path
      FROM products WHERE id = ?
    `;
    const params = [productID];

    const errorMessage = 'Erro ao buscar produto no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  insert: async (newProduct) => {
    const query = `
      INSERT INTO products (name, price, description, stock, status, image_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      newProduct.name,
      newProduct.price,
      newProduct.description,
      newProduct.stock,
      newProduct.status,
      newProduct.image_path,
    ];

    const errorMessage = 'Erro ao cadastrar produto no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  updateById: async ({ description, productId }) => {
    const query = `
      UPDATE products
      SET description = ?
      WHERE id = ?
    `;
    const params = [description, productId];

    const errorMessage = 'Erro ao atualizar pedido no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  deleteById: async (productId) => {
    const query = `
      DELETE FROM products WHERE id = ?
    `;
    const params = [productId];

    const errorMessage = 'Erro ao deletar produto no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },
};
