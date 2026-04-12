export const passwordRecoveryEmail = (name, recoveryLink) => {
  return `
    <h1>Recuperação de senha</h1>
    <p>Olá, ${name}.</p>
    <a href="${recoveryLink}">Redefinir senha</a>
  `;
};
