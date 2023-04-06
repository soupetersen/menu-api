<div align="center">

Para Fábrica de Startup

</div>

<hr/>

Técnologias utilizadas:
- Typescript
- NodeJS
- Express
- MongoDB (Mongoose)
- Jest
- Zod

<br/>

Jest foi utilizado para testes automatizados

Zod foi utilizado para validar os campos das requisições

<hr/>

## Getting Started

<br/>

### Requirements

<br/>

Crie um banco de dados em https://account.mongodb.com e pegue uma url de conexão,
algo parecido com isso: mongodb+srv://user:password@user.faehj.mongodb.net/database?retryWrites=true&w=majority, e coloque essa url em DATABASE_URL no arquivo .env.local

Adicione a chave secretea em JWT_SECRET no arquivo .env.local

<br/>

Install dependencies:

```bash
pnpm install
```

Seed database:

```bash
pnpm seed
```

Run dev server:

```bash
pnpm dev
```

</br>

Utilizando http://localhost:3000

</br>

### [`POST /auth/register`](./src/routes/authenticate.routes.ts)

Requisição para registrar conta

<br/>

### [`POST /auth/login`](./src/routes/authenticate.routes.ts)

Requisição de Login para pegar o token de usuário

<br/>

### [`GET /category`](./src/routes/category.routes.ts)
*Utilizar jwt token na requisição

Requisição para receber todas as categorias de produtos

<br/>

### [`GET /product`](./src/routes/products.routes.ts)
*Utilizar jwt token na requisição

Requisição para receber todas os produtos

<br/>

### [`GET /product/:id`](./src/routes/products.routes.ts)
*Utilizar jwt token na requisição

Requisição para receber um produto específico

<br/>

### [`POST /product`](./src/routes/products.routes.ts)
*Utilizar jwt token na requisição

Requisição para criar um produto

```typescript
// Corpo da requisição
{
    name: "Product",
    price: 10,
    qty: 10,
    categories: ["1", "2", "3", "4"]
}
```

<br/>

### [`PATCH /product/:id`](./src/routes/category.routes.ts)
*Utilizar jwt token na requisição

Requisição para alterar um produto

```typescript
// Corpo da requisição
{
    name: "Novo nome",
    price: "Novo preço",
    qty: "Nova quantidade",
    categories: ["Nova categoria"]
}
```

<br/>

### [`DELETE /product/:id`](./src/routes/category.routes.ts)
*Utilizar jwt token na requisição

Requisição para deleter um produto

<br/>