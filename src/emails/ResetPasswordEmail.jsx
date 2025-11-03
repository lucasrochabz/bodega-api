import { Html, Body, Container, Text, Button } from '@react-email/components';

export const ResetPasswordEmail = ({ user, resetUrl }) => {
  const main = {
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
    padding: '2.5rem',
  };

  const container = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '2rem 3rem',
    margin: '0 auto',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const button = {
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'uppercase',
    borderRadius: '10px',
    padding: '0.8rem 1.2rem',
  };

  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Text>Olá, {user} 👋</Text>
          <Text>Você solicitou a redifinição da sua senha.</Text>
          <Button style={button} href={resetUrl}>
            Redefinir senha
          </Button>
          <Text>Se você não fez essa solicitação, ignore este e-mail.</Text>
        </Container>
      </Body>
    </Html>
  );
};
