# Bodega API v1.5.1

![Imagem do projeto](docs/bodega-api01.png)

## Sobre

Este projeto é uma simulação de e-commerce desenvolvida com **Node.js** e **Express**, utilizando **JSON Web Tokens (JWT)** para autenticação segura e **bcrypt** para criptografia de senhas. O **MySQL** é utilizado como banco de dados, garantindo armazenamento estruturado e eficiente.

A API desenvolvida permite aos usuários visualizar e comprar produtos, consultar o histórico de pedidos, além de fornecer páginas de login e criação de cadastro para acesso seguro à plataforma.
O Front-end [Bodega](https://github.com/lucasrochabz/bodega), desenvolvido em **JavaScript** com **React**, oferecendo uma navegação fluida com **React Router**, consome essa API para exibir dados dinâmicos, proporcionando uma experiência interativa e moderna.

A aplicação segue boas práticas de desenvolvimento, garantindo uma experiência moderna, segura e eficiente.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Json Web Token**: Mecanismo de autenticação baseado em tokens.
- **Bcrypt**: Biblioteca para hash e criptografia de senhas.
- **MySQL**: Banco de dados relacional.

## Requisitos

- Node na versão versão 16.0 ou superior
- NPM na versão versão 10.9 ou superior
- MySQL na versão versão 8.0 ou superior

## Como instalar?

1. Faça o clone do projeto.
2. Abra o terminal e navegue até a pasta do projeto.
3. Faça uma cópia do arquivo `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Edite o arquivo `.env` com os valores apropriados para o seu ambiente.
5. Instale as dependências usando o comando:
   ```bash
   npm install
   ```
6. Crie o banco de dados com o comando:
   ```bash
   npm run db:init
   ```
7. Crie as tabelas com o comando:
   ```bash
   npm run db:tables
   ```
8. Insira os dados nas tabelas com o comando:
   ```bash
   npm run db:seed
   ```
9. Inicie o servidor localmente com o comando:
   ```bash
   npm run dev
   ```

## Como rodar com Docker

### Pré-requisitos

- Docker instalado na sua máquina.
- Docker compose.

### Passos para rodar a API com Docker:

1. Clone o projeto e entre na pasta dele.
2. Instale as dependências com:
   ```bash
   npm install
   ```
3. Construa a imagem Docker:
   ```bash
   npm run docker:build
   ```
4. Inicie os containers em modo detached:
   ```bash
   npm run docker:up
   ```
5. A API estará disponível em: http://localhost:4000
6. Para acessar o terminal do container da API, execute:
   ```bash
   docker exec -it bodega-api-api-1 bash
   ```
7. Dentro do container, crie as tabelas do banco de dados:
   ```bash
   npm run db:create-tables
   ```
8. Ainda dentro do container, insira os dados iniciais nas tabelas:
   ```bash
   npm run db:insert-data
   ```

## Estrutura do projeto

```bash
bodega-api/
├── scripts/
│   ├── createDB.js
│   ├── createTables.js
│   └── insertData.js
│
├── sql/
│   ├── create_db/
│   │   └── 1_create_db.sql
│   │
│   ├── create_tables/
│   │   ├── 1_users_table.sql
│   │   ├── 2_addresses_table.sql
│   │   ├── 3_products_table.sql
│   │   ├── 4_orders_table.sql
│   │   └── 5_orders_products_table.sql
│   │
│   └── insert_data/
│       ├── 1_users_data.sql
│       ├── 2_addresses_data.sql
│       ├── 3_products_data.sql
│       ├── 4_orders_data.sql
│       └── 5_orders_products_data.sql
│
├── src/
│   ├── controllers/
│   │   ├── controller.js
│   │   └── controller.test.js
│   │
│   ├── database/
│   ├── env/
│   ├── helpers/
│   │   ├── executeQuery.js
│   │   └── inputValidationHelper.js
│   │
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── swagger/
│   ├── utils/
│   │   ├── hashUtils.js
│   │   └── tokenUtils.js
│   │
│   ├── app.js
│   └── server.js
│
├── .dockerignore
├── env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## Front-end do Projeto

Este projeto possui um Front-end desenvolvido para consumir esta API. Você pode acessá-lo no repositório:
[Acesse o repositório do Front-end](https://github.com/lucasrochabz/bodega)

## Encontrou algum problema?

Abra uma [issue](https://github.com/lucasrochabz/bodega-api/issues) com sua sugestão ou crítica.
