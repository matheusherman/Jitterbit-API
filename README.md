# Order API

API REST para gerenciamento de pedidos, desenvolvida com Node.js, Express e PostgreSQL.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose
- Jest

## Estrutura do projeto

```text
src/
├── controller/
├── service/
├── repository/
├── routes/
├── database/
│   └── init/
├── error/
├── middleware/
└── server.js
```

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (opcional, para execução via containers)

## Variáveis de ambiente

Use o arquivo `.env.example` já disponível no projeto e renomeie para `.env` na raiz:

```bash
cp .env.example .env
```

Conteúdo esperado do `.env`:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=orders
API_PORT=3000
POSTGRES_PORT=5432
```

## Executando o projeto

### Com Docker

```bash
docker compose up --build
```

API: `http://localhost:${API_PORT}`

### Localmente (sem Docker)

```bash
npm install
node src/server.js
```

API: `http://localhost:3000`

## Testes

```bash
npm test
```

## Endpoints

### Health check

```http
GET /
```

Resposta:

```text
200 OK
API running
```

### Criar pedido

```http
POST /order
```

Body de entrada (formato externo):

```json
{
  "numeroPedido": "v10089015vdb",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

Resposta:

```json
{
  "data": {
    "orderId": "v10089015vdb",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
}
```

Status: `201 Created`

### Buscar pedido por ID

```http
GET /order/:id
```

Resposta de sucesso:

```json
{
  "data": {
    "orderid": "v10089015vdb",
    "value": "10000",
    "creationdate": "2023-07-19T12:24:11.529Z"
  }
}
```

Se não encontrado: `404 Not Found`

### Listar pedidos

```http
GET /order/list
```

Resposta de sucesso:

```json
{
  "data": []
}
```

### Atualização parcial

```http
PATCH /order/:id
```

Campos aceitos no body:

```json
{
  "value": 5000,
  "creationDate": "2023-07-19T12:24:11.529Z"
}
```

Retorna `200 OK` com objeto atualizado dentro de `data`.

### Substituição completa

```http
PUT /order/:id
```

Body obrigatório:

```json
{
  "value": 7000,
  "creationDate": "2023-07-19T12:24:11.529Z"
}
```

Retorna `200 OK` com objeto atualizado dentro de `data`.

### Remover pedido

```http
DELETE /order/:id
```

Resposta: `204 No Content`

## Banco de dados

Schema inicial (`src/database/init/init.sql`):

- `orders(orderId, value, creationDate)`
- `items(orderId, productId, quantity, price)`

## Padrão de erro

Erros são retornados neste formato:

```json
{
  "error": {
    "message": "Order not found"
  }
}
```

Status mais comuns:

- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`
