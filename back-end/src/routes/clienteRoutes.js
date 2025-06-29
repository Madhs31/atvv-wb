import express from 'express';
import { getAllClientes, createCliente, updateCliente, deleteCliente } from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', getAllClientes);
router.post('/', createCliente);
router.put('/:cpf', updateCliente);
router.delete('/:cpf', deleteCliente);

export default router;