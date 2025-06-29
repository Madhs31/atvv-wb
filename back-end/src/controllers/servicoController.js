import pool from '../database/db.js';

export const getAllServicos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM servicos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar serviços', error });
    }
};

export const getServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM servicos WHERE id = ?', [id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Serviço não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar serviço', error });
    }
};

export const createServico = async (req, res) => {
    const { id, nome, preco } = req.body;
    try {
        await pool.query(
            'INSERT INTO servicos (id, nome, preco) VALUES (?, ?, ?)',
            [id, nome, preco]
        );
        res.status(201).json({ message: 'Serviço cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar serviço', error });
    }
};

export const updateServico = async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE servicos SET nome = ?, preco = ? WHERE id = ?',
            [nome, preco, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
        res.json({ message: 'Serviço atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar serviço', error });
    }
};

export const deleteServico = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM servicos WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
        res.json({ message: 'Serviço excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir serviço', error });
    }
};