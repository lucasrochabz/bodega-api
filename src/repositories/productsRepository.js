import executeQuery from '../database/executeQuery.js';

export const productsRepository = {
  countAll: async () => {
    const query = `
      SELECT COUNT(*) AS total
      FROM products
    `;

    const rows = await executeQuery(query);
    return rows[0].total;
  },

  findAll: async ({ limit, offset }) => {
    const query = `
      SELECT id, name, price, description, image_path
      FROM products
      LIMIT ? OFFSET ?
    `;
    const params = [limit, offset];

    const rows = await executeQuery(query, params);
    return rows;
  },

  findById: async (productID) => {
    const query = `
      SELECT id, name, price, description, stock, status, image_path
      FROM products WHERE id = ?
    `;
    const params = [productID];

    const rows = await executeQuery(query, params);
    return rows[0];
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

    const result = await executeQuery(query, params);
    return result.insertId;
  },

  updateViews: async (productId) => {
    const query = `
      UPDATE products
      SET views = views + 1
      WHERE id = ?
    `;
    const params = [productId];

    await executeQuery(query, params);
  },

  updateById: async ({ description, productId }) => {
    const query = `
      UPDATE products
      SET description = ?
      WHERE id = ?
    `;
    const params = [description, productId];

    const result = await executeQuery(query, params);
    return result;
  },

  deleteById: async (productId) => {
    const query = `
      DELETE FROM products WHERE id = ?
    `;
    const params = [productId];

    const result = await executeQuery(query, params);
    return result;
  },
};
