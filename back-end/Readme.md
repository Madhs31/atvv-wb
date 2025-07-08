# 💅 World Beauty - Back-End

Este repositório contém a implementação do back-end da aplicação **World Beauty**, desenvolvida como parte da Atividade Prática da disciplina ATVIV. O objetivo principal deste projeto é gerenciar clientes, produtos e o consumo de serviços, utilizando uma arquitetura RESTful.

## 🚀 Tecnologias Utilizadas

| Tecnologia          | Versão Exata     |
|---------------------|------------------|
| Node.js             | v24.0.0          |
| TypeScript          | 5.8.3            |
| Express.js          | 5.1.0            |
| Prisma ORM          | 6.10.1           |
| MySQL               | —                |
| CORS                | 2.8.5            |
| TSX                 | 4.20.3           |
| ESLint              | 9.25.0           |

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
