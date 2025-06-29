import pool from '../database/db.js';

// Liste os 10 clientes que mais compraram em quantidade
export const getMaioresConsumidoresQuantidade = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.nome, SUM(v.quantidade) as quantidade
            FROM vendas v
            JOIN clientes c ON v.cliente_cpf = c.cpf
            GROUP BY c.cpf, c.nome
            ORDER BY quantidade DESC
            LIMIT 10;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

// Liste os 10 clientes que menos compraram em quantidade
export const getMenoresConsumidoresQuantidade = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.nome, SUM(v.quantidade) as quantidade
            FROM vendas v
            JOIN clientes c ON v.cliente_cpf = c.cpf
            GROUP BY c.cpf, c.nome
            ORDER BY quantidade ASC
            LIMIT 10;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

// Liste os 5 clientes que mais gastaram em valor
export const getMaioresConsumidoresValor = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.nome, SUM(v.valor_total) as valor
            FROM vendas v
            JOIN clientes c ON v.cliente_cpf = c.cpf
            GROUP BY c.cpf, c.nome
            ORDER BY valor DESC
            LIMIT 5;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

// Liste os produtos e serviços mais consumidos no geral
export const getProdutosServicosMaisConsumidos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT nome, tipo, SUM(total) as total
            FROM (
                SELECT p.nome, 'Produto' as tipo, SUM(v.quantidade) as total
                FROM vendas v
                JOIN produtos p ON v.produto_id = p.id
                WHERE v.produto_id IS NOT NULL
                GROUP BY p.nome
                UNION ALL
                SELECT s.nome, 'Serviço' as tipo, SUM(v.quantidade) as total
                FROM vendas v
                JOIN servicos s ON v.servico_id = s.id
                WHERE v.servico_id IS NOT NULL
                GROUP BY s.nome
            ) as consumidos
            GROUP BY nome, tipo
            ORDER BY total DESC;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};

// Liste os produtos e serviços mais consumidos por gênero
export const getConsumoPorGenero = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.genero, p.nome, 'Produto' as tipo, SUM(v.quantidade) as total
            FROM vendas v
            JOIN clientes c ON v.cliente_cpf = c.cpf
            JOIN produtos p ON v.produto_id = p.id
            WHERE v.produto_id IS NOT NULL
            GROUP BY c.genero, p.nome
            UNION ALL
            SELECT c.genero, s.nome, 'Serviço' as tipo, SUM(v.quantidade) as total
            FROM vendas v
            JOIN clientes c ON v.cliente_cpf = c.cpf
            JOIN servicos s ON v.servico_id = s.id
            WHERE v.servico_id IS NOT NULL
            GROUP BY c.genero, s.nome
            ORDER BY c.genero, total DESC;
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar relatório', error });
    }
};