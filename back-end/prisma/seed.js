const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.produto.createMany({
    data: [
      { id: 'P1', nome: 'Shampoo', descricao: 'Shampoo hidratante', valor: 29.9 },
      { id: 'P2', nome: 'Condicionador', descricao: 'Condicionador nutritivo', valor: 34.9 },
      { id: 'P3', nome: 'Máscara Capilar', descricao: 'Máscara de tratamento intensivo', valor: 49.9 },
    ],
    skipDuplicates: true,
  });

  await prisma.servico.createMany({
    data: [
      { id: 'S1', nome: 'Corte de cabelo', descricao: 'Corte masculino', valor: 45 },
      { id: 'S2', nome: 'Escova', descricao: 'Escova modeladora', valor: 60 },
      { id: 'S3', nome: 'Coloração', descricao: 'Tintura capilar', valor: 120 },
    ],
    skipDuplicates: true,
  });

  await prisma.cliente.create({
    data: {
      nome: 'Ana Souza',
      nomeSocial: 'Ana',
      genero: 'Feminino',
      cpf: '12345678900',
      rg: 'MG1234567',
      telefone: '(31) 91234-5678',
      produtos: {
        create: [{ produtoId: 'P1' }, { produtoId: 'P3' }],
      },
      servicos: {
        create: [{ servicoId: 'S1' }, { servicoId: 'S2' }],
      },
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
