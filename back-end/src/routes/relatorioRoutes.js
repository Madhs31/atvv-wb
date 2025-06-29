import express from 'express';
import { getMaioresConsumidoresQuantidade, getMenoresConsumidoresQuantidade, getMaioresConsumidoresValor, getProdutosServicosMaisConsumidos, getConsumoPorGenero } from '../controllers/relatorioController.js';

const router = express.Router();

router.get('/maior-quantidade', getMaioresConsumidoresQuantidade);
router.get('/menor-quantidade', getMenoresConsumidoresQuantidade);
router.get('/maior-valor', getMaioresConsumidoresValor);
router.get('/geral', getProdutosServicosMaisConsumidos);
router.get('/por-genero', getConsumoPorGenero);

export default router;