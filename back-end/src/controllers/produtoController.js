import pool from '../database/db.js';

export const getAllProdutos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
};

export const getProdutoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto', error });
    }
};

export const createProduto = async (req, res) => {
    const { id, nome, preco } = req.body;
    try {
        await pool.query(
            'INSERT INTO produtos (id, nome, preco) VALUES (?, ?, ?)',
            [id, nome, preco]
        );
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar produto', error });
    }
};

export const updateProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?',
            [nome, preco, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};

export const deleteProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir produto', error });
    }
};