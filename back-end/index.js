import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './src/routes/clienteRoutes.js';
import produtoRoutes from './src/routes/produtoRoutes.js';
import servicoRoutes from './src/routes/servicoRoutes.js';
import relatorioRoutes from './src/routes/relatorioRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/relatorios', relatorioRoutes);

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});