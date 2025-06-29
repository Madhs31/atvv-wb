import express from 'express';
import { getAllServicos, createServico, updateServico, deleteServico, getServicoById } from '../controllers/servicoController.js';

const router = express.Router();

router.get('/', getAllServicos);
router.get('/:id', getServicoById);
router.post('/', createServico);
router.put('/:id', updateServico);
router.delete('/:id', deleteServico);

export default router;