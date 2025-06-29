import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// CLIENTES
app.post("/clientes", async (req, res) => {
  const { nome, nomeSocial, genero, cpf, rg, telefone } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: { nome, nomeSocial, genero, cpf, rg, telefone },
    });
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
});

// PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

app.post("/produtos", async (req, res) => {
  const { nome, descricao, valor } = req.body;
  try {
    const produto = await prisma.produto.create({
      data: { nome, descricao, valor },
    });
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar produto" });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  const id = req.params.id; // string
  try {
    await prisma.produto.delete({ where: { id } });
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

// SERVIÇOS
app.get("/servicos", async (req, res) => {
  try {
    const servicos = await prisma.servico.findMany();
    res.json(servicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
});

app.post("/servicos", async (req, res) => {
  const { nome, descricao, valor } = req.body;
  try {
    const servico = await prisma.servico.create({
      data: { nome, descricao, valor },
    });
    res.status(201).json(servico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar serviço" });
  }
});

app.delete("/servicos/:id", async (req, res) => {
  const id = req.params.id; // string
  try {
    await prisma.servico.delete({ where: { id } });
    res.status(200).json({ message: "Serviço excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir serviço" });
  }
});

// CONSUMO
app.post("/cliente/:id/produtos", async (req, res) => {
  const clienteId = Number(req.params.id);
  const { produtoId, quantidade } = req.body;
  try {
    const novoConsumo = await prisma.clienteProduto.create({
      data: { clienteId, produtoId, quantidade },
    });
    res.status(201).json(novoConsumo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar consumo de produto" });
  }
});

app.post("/cliente/:id/servicos", async (req, res) => {
  const clienteId = Number(req.params.id);
  const { servicoId, quantidade } = req.body;
  try {
    const novoConsumo = await prisma.clienteServico.create({
      data: { clienteId, servicoId, quantidade },
    });
    res.status(201).json(novoConsumo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar consumo de serviço" });
  }
});

// ESTATÍSTICAS
app.get("/estatisticas/consumo", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        produtos: { include: { produto: true } },
        servicos: { include: { servico: true } },
      },
    });

    const resultado = clientes.map((cliente) => {
      const totalProdutos = cliente.produtos.reduce(
        (soma, cp) => soma + cp.quantidade,
        0
      );
      const totalServicos = cliente.servicos.reduce(
        (soma, cs) => soma + cs.quantidade,
        0
      );
      const valorProdutos = cliente.produtos.reduce(
        (soma, cp) => soma + cp.quantidade * cp.produto.valor,
        0
      );
      const valorServicos = cliente.servicos.reduce(
        (soma, cs) => soma + cs.quantidade * cs.servico.valor,
        0
      );

      return {
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        quantidadeProduto: totalProdutos,
        quantidadeServico: totalServicos,
        valorProduto: valorProdutos,
        valorServico: valorServicos,
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar estatísticas" });
  }
});

app.get("/estatisticas/produtos-servicos", async (req, res) => {
  try {
    const produtos = await prisma.clienteProduto.groupBy({
      by: ["produtoId"],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: "desc" } },
    });

    const servicos = await prisma.clienteServico.groupBy({
      by: ["servicoId"],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: "desc" } },
    });

    const produtosDetalhes = await Promise.all(
      produtos.map(async (p) => {
        const produto = await prisma.produto.findUnique({ where: { id: p.produtoId } });
        return {
          id: p.produtoId,
          nome: produto?.nome || "Desconhecido",
          quantidade: p._sum.quantidade || 0,
        };
      })
    );

    const servicosDetalhes = await Promise.all(
      servicos.map(async (s) => {
        const servico = await prisma.servico.findUnique({ where: { id: s.servicoId } });
        return {
          id: s.servicoId,
          nome: servico?.nome || "Desconhecido",
          quantidade: s._sum.quantidade || 0,
        };
      })
    );

    res.json({ produtos: produtosDetalhes, servicos: servicosDetalhes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar estatísticas de consumo" });
  }
});

app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001");
});
