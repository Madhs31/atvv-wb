# 💅 World Beauty - Back-End

Este repositório contém a implementação do back-end da aplicação **World Beauty**, desenvolvida como parte da Atividade Prática da disciplina ATVIV. O objetivo principal deste projeto é gerenciar clientes, produtos e o consumo de serviços, utilizando uma arquitetura RESTful.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express.js** para criação da API REST
- **Prisma ORM** para interação com o banco de dados
- **MySQL** como banco de dados relacional
- **Dotenv** para gerenciamento de variáveis de ambiente

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js e npm
- MySQL instalado
- Banco de dados `world_beauty` criado

## Como Executar

### Navegue até o diretório do back-end:
```bash
cd atvv-wb/back-end
```

### Instale as dependências:
```bash
npm install
```

### Crie um arquivo .env na raiz do projeto com as seguintes variáveis (Substitua usuario e senha pelos dados do seu banco de dados MySQL.):
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/world_beauty"
```

### Execute as migrações do Prisma para configurar o banco de dados:
```bash
npx prisma migrate dev
```

### Inicie o servidor:
```bash
npm run dev
```
