import pool from '../database/db.js';

export const getAllClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error });
  }
};

export const createCliente = async (req, res) => {
  const { nome, nomeSocial, cpf, genero, dataCadastro, telefone } = req.body;
  try {
    await pool.query(
      'INSERT INTO clientes (nome, nomeSocial, cpf, genero, dataCadastro, telefone) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, nomeSocial, cpf, genero, dataCadastro, telefone]
    );
    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
  }
};

export const updateCliente = async (req, res) => {
    const { cpf } = req.params;
    const { nome, nomeSocial, telefone } = req.body;
    try {
        await pool.query(
            'UPDATE clientes SET nome = ?, nomeSocial = ?, telefone = ? WHERE cpf = ?',
            [nome, nomeSocial, telefone, cpf]
        );
        res.json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
};

export const deleteCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        await pool.query('DELETE FROM clientes WHERE cpf = ?', [cpf]);
        res.json({ message: 'Cliente excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir cliente', error });
    }
};