import executeQuery from '../database/executeQuery.js';

export const productsRepository = {
  findAll: async ({ pageNumber, pageSizeNumber }) => {
    const offset = (pageNumber - 1) * pageSizeNumber;

    const countQuery = `
      SELECT COUNT(*)
      AS total
      FROM products
    `;

    // fix: tirar essa responsabilidade do repository
    const countResults = await executeQuery(countQuery);
    const totalProducts = countResults[0].total;
    const totalPages = Math.ceil(totalProducts / pageSizeNumber);

    const fetchQuery = `
      SELECT id, name, price, description, image_path
      FROM products
      LIMIT ? OFFSET ?
    `;
    const params = [pageSizeNumber, offset];

    const results = await executeQuery(fetchQuery, params);
    return { results, totalPages };
  },

  findByProductId: async (productID) => {
    const query = `
      SELECT id, name, price, description, stock, status, image_path
      FROM products WHERE id = ?
    `;
    const params = [productID];

    const results = await executeQuery(query, params);
    return results[0];
  },

  insert: async (productData) => {
    const query = `
      INSERT INTO products (name, price, description, stock, status, image_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      productData.name,
      productData.price,
      productData.description,
      productData.stock,
      productData.status,
      productData.image_path,
    ];

    const results = await executeQuery(query, params);
    return results.insertId;
  },

  updateById: async ({ description, productId }) => {
    const query = `
      UPDATE products
      SET description = ?
      WHERE id = ?
    `;
    const params = [description, productId];

    return await executeQuery(query, params);
  },

  deleteById: async (productId) => {
    const query = `
      DELETE FROM products WHERE id = ?
    `;
    const params = [productId];

    return await executeQuery(query, params);
  },
};
