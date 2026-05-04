import { sendEmail } from '#shared/helpers/sendEmail.js';
import {
  welcomeEmail,
  orderConfirmationEmail,
  passwordRecoveryEmail,
} from '#src/emails/index.js';

// fix: add try/catch onde chamam esse service
// fix: remover comentario do to
export const emailService = {
  sendWelcomeEmail: async (email, name) => {
    const response = await sendEmail({
      // to: 'lucasbezerrar@gmail.com',
      to: email,
      subject: 'Bem-vindo à Bodega API!',
      html: welcomeEmail(name),
    });

    return response;
  },

  sendOrderConfirmationEmail: async (email, name, orderId) => {
    const response = await sendEmail({
      // to: 'lucasbezerrar@gmail.com',
      to: email,
      subject: 'Pedido confirmado!',
      html: orderConfirmationEmail(name, orderId),
    });

    return response;
  },

  sendPasswordRecoveryEmail: async (email, name, recoveryLink) => {
    const response = await sendEmail({
      // to: 'lucasbezerrar@gmail.com',
      to: email,
      subject: 'Recuperação de senha',
      html: passwordRecoveryEmail(name, recoveryLink),
    });

    return response;
  },
};
