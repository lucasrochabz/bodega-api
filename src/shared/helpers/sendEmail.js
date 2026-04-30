import { resend } from '#src/lib/resend.js';
import { EMAIL_CONFIG } from '#src/config/email.js';

export const sendEmail = ({ to, subject, html }) => {
  return resend.emails.send({
    from: EMAIL_CONFIG.from,
    to,
    subject,
    html,
  });
};
