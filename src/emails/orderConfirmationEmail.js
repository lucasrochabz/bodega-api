export const orderConfirmationEmail = (name, orderId) => {
  return `
    <h1>Pedido confirmado</h1>
    <p>Olá, ${name}.</p>
    <p>Número do pedido: ${orderId}</p>
  `;
};
