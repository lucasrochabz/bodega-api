## Bodega API v1.0

### Sobre

Este projeto é uma simulação de e-commerce desenvolvida com **Node.js** e **Express**, utilizando **JSON Web Tokens (JWT)** para autenticação segura e **bcrypt** para criptografia de senhas. O **MySQL** é utilizado como banco de dados, garantindo armazenamento estruturado e eficiente.

A API desenvolvida permite aos usuários visualizar e comprar produtos, consultar o histórico de pedidos, além de fornecer páginas de login e criação de cadastro para acesso seguro à plataforma.
O Front-end [Bodega](https://github.com/lucasrochabz/bodega), desenvolvido em **JavaScript** com **React**, oferecendo uma navegação fluida com **React Router**, consome essa API para exibir dados dinâmicos, proporcionando uma experiência interativa e moderna.

A aplicação segue boas práticas de desenvolvimento, garantindo uma experiência moderna, segura e eficiente.

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
3. Faça uma cópia do arquivo `.env.example`:
   `cp .env.example .env`.
4. Edite o arquivo **.env** com os valores apropriados para o seu ambiente.
5. Instale as dependências usando o comando:
   ```bash
   npm install
   ```
6. Crie o banco de dados com o comando:
   ```bash
   npm run db:create
   ```
7. Crie as tabelas com o comando:
   ```bash
   npm run db:create-tables
   ```
8. Insira os dados nas tabelas com o comando:
   ```bash
   npm run db:insert-data
   ```
9. Inicie o servidor localmente com o comando:
   ```bash
   npm start
   ```

### Front-end do Projeto

Este projeto possui um Front-end desenvolvido para consumir esta API. Você pode acessá-lo no repositório:
[Acesse o repositório do Front-end](https://github.com/lucasrochabz/bodega)

### Encontrou algum problema?

Abra uma [issue](https://github.com/lucasrochabz/bodega-api/issues) com sua sugestão ou crítica.
