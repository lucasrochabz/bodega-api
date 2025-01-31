## Bodega API version-1.0

### Sobre

Este projeto é uma simulação de e-commerce com autenticação segura por JSON Web Tokens (JWT) e criptografia de senhas com bcrypt. Desenvolvido em Node.js com Express no back-end, utiliza MySQL como banco de dados para garantir armazenamento estruturado e eficiente. A arquitetura escalável e robusta permite aos usuários visualizar e comprar produtos, além de consultar o histórico de pedidos. Com a utilização de JavaScript e React, o projeto demonstra boas práticas de segurança, autenticação e exibição dinâmica de dados, proporcionando uma experiência de compra online completa e eficiente.

### Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Json Web Token**: Mecanismo de autenticação baseado em tokens.
- **Bcrypt**: Biblioteca para hash e criptografia de senhas.
- **MySQL**: Banco de dados relacional.

### Requisitos

- Node na versão versão 22.12 ou superior
- NPM na versão versão 10.9 ou superior
- MySQL na versão versão 8.0 ou superior

### Como instalar?

1. Faça o clone do projeto.
2. Abra o terminal e navegue até a pasta do projeto.
3. Faça uma cópia do arquivo `.env.example`: `cp .env.example .env`.
4. Edite o arquivo **.env** com os valores apropriados para o seu ambiente.
5. Instale as dependencias usando o comando: `npm install`.
6. Crie o banco de dados com o comando: `npm run db:create`.
7. Crie as tabelas com o comando: `npm run db:create-tables`.
8. Insira os dados nas tabelas com o comando: `npm run db:insert-data`.
9. Inicie o servidor localmente com o comando: `npm start`.

### Front-end do Projeto

Este projeto possui um Front-end desenvolvido para consumir esta API. Você pode acessá-lo no repositório:
[Acesse o repositório do Front-end](https://github.com/lucasrochabz/bodega)

### Encontrou algum problema?

Abra uma [issue](https://github.com/lucasrochabz/bodega-api/issues) com sua sugestão ou crítica.
