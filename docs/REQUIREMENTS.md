## Requisitos e Regras do Projeto Bodega API

### Requisitos Funcionais (RF)

1. Produtos

- [ ] Criar produto
- [ ] Listar produtos
- [ ] Buscar produto por ID
- [ ] Atualizar produto
- [ ] Remover produto

2. Categorias

- [ ] Criar categoria
- [ ] Listar categorias
- [ ] Atualizar categoria
- [ ] Remover categoria

3. Usuários

- [ ] Cadastro de usuário
- [ ] Login de usuário (JWT)
- [ ] Atualizar perfil
- [ ] Excluir conta

4. Pedidos

- [ ] Criar pedido (checkout)
- [ ] Listar pedidos do usuário
- [ ] Detalhar pedido
- [ ] Atualizar status do pedido (admin)

### Requisitos Não Funcionais (RNF)

- [ ] API construída em Node.js com Express
- [ ] Banco de dados relacional (PostgreSQL ou MySQL)
- [ ] Uso de ORM (Sequelize, Prisma ou TypeORM)
- [ ] Autenticação via JWT
- [ ] Documentação com Swagger ou similar
- [ ] Versionamento da API (ex: `/api/v1`)
- [ ] Código limpo e modular
- [ ] Validação de dados com biblioteca (Yup, Joi, etc.)
- [ ] Utilização de variáveis de ambiente com dotenv

### Regras de Negócio (RN)

- [ ] O nome do produto deve ser único dentro de uma mesma categoria.
- [ ] O estoque de um produto deve ser verificado antes da finalização do pedido.
- [ ] Um pedido só pode ser criado se o carrinho tiver ao menos um item.
- [ ] O valor total do pedido deve ser calculado automaticamente com base nos preços e quantidades dos itens.
- [ ] Um usuário não autenticado não pode realizar pedidos.
- [ ] Apenas usuários administradores podem criar, atualizar ou excluir produtos e categorias.
- [ ] O status de um pedido pode ser: `pendente`, `em processamento`, `enviado`, `entregue`, ou `cancelado`.
- [ ] O usuário pode cancelar um pedido apenas se ele ainda estiver com status `pendente`.
- [ ] O e-mail de cadastro do usuário deve ser único no sistema.
- [ ] Senhas de usuários devem ser armazenadas de forma segura (ex: usando bcrypt).

### Tecnologias

<!-- Prod -->

npm install --save express  
npm install --save mysql2  
npm install --save dotenv  
npm install --save cors  
npm install --save bcrypt  
npm install --save jsonwebtoken  
npm install --save joi  
npm install --save swagger-ui-express  
npm install --save yamljs

<!-- Dev -->

npm install --save-dev nodemon

### Ajustes

- [ ] Apagar arquivo loginMiddleware.js e orderMiddleware.js
