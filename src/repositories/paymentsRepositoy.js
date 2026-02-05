import executeQuery from '../database/executeQuery.js';

export const paymentsRepositoy = {
  insert: async (paymentData) => {
    const query = `
      INSERT INTO payments (payment_method, gateway, payment_token, order_id)
      VALUES (?, ?, ?, ?)
    `;

    const params = [
      paymentData.payment_method,
      paymentData.gateway,
      paymentData.payment_token,
      paymentData.order_id,
    ];

    const result = await executeQuery(query, params);
    return result;
  },

  updateByOrderId: async ({ status, order_id, transaction_id }) => {
    const query = `
      UPDATE payments
      SET
        status = ?,
        transaction_id = ?
      WHERE order_id = ?
      AND status <> ?
    `;
    const params = [status, transaction_id, order_id, status];

    const result = await executeQuery(query, params);
    return result;
  },
};
