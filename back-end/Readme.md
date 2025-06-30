# 💅 World Beauty - Front-End

Este é o front-end da aplicação **World Beauty**, desenvolvido com **React**, **TypeScript**, **Vite** e **Tailwind CSS**. Esta interface permite o gerenciamento visual de clientes, produtos e consumo de serviço.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js e npm
- MySQL instalado
- Banco de dados `world_beauty` criado

### Passos:

# Acesse a pasta do back-end
```bash
cd back-end
```

# Instale as dependências
```bash
npm install
```

# Configure as variáveis de ambiente
```bash
cp .env.example .env
# edite o .env com sua string de conexão:
# DATABASE_URL="mysql://usuario:senha@localhost:3306/world_beauty"
```

# Configure o banco
```bash
npx prisma db push
```

# Inicie o servidor
```bash
npm run dev
```
