import { Resend } from 'resend';
import { welcomeEmail } from '../emails/welcomeEmail.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// fix: enviar email de boas-vindas
// fix: enviar email de recuperação de senha
// fix: enviar email de confirmação de pedido
export const emailService = {
  sendWelcomeEmail: async (email, name) => {
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'lucasbezerrar@gmail.com',
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
