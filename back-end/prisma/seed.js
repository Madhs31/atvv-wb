const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.produto.createMany({
    data: [
      { id: 'P1', nome: 'Sérum Iluminador com Pérolas de Ouro', descricao: 'Sérum facial com partículas de ouro para iluminar e renovar a pele', valor: 120.0 },
      { id: 'P2', nome: 'Creme Anti-Idade com Peptídeos Inteligentes', descricao: 'Creme facial que reduz rugas e linhas de expressão', valor: 150.0 },
      { id: 'P3', nome: 'Gel de Limpeza Facial com Carvão Ativado', descricao: 'Gel que remove impurezas e controla oleosidade', valor: 80.0 },
    ],
    skipDuplicates: true,
  });

  await prisma.servico.createMany({
    data: [
      { id: 'S1', nome: 'Hidratação Facial com Máscara de Ouro', descricao: 'Tratamento facial hidratante e iluminador com máscara de ouro', valor: 200.0 },
      { id: 'S2', nome: 'Massagem Relaxante com Aromaterapia', descricao: 'Massagem corporal com óleos essenciais para relaxamento', valor: 180.0 },
      { id: 'S3', nome: 'Tratamento de Crescimento Capilar com Dermapen', descricao: 'Estimulação do couro cabeludo para promover crescimento capilar', valor: 250.0 },
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
