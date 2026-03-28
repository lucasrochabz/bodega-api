import emailConfig from '../config/email.js';
import { resend } from '../lib/resend.js';
import { welcomeEmail } from '../emails/welcomeEmail.js';

// fix: enviar email de boas-vindas
// fix: enviar email de recuperação de senha
// fix: enviar email de confirmação de pedido
export const emailService = {
  sendWelcomeEmail: async (email, name) => {
    try {
      const response = await resend.emails.send({
        from: emailConfig.from,
        // to: 'lucasbezerrar@gmail.com',
        to: email,
        subject: 'Bem-vindo à Bodega API!',
        html: welcomeEmail(name),
      });

      console.log('E-mail enviado:', response);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  },
};
