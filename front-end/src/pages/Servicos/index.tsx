import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

interface IServico {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
}

const Servico: React.FC = () => {
  const [servicos, setServicos] = useState<IServico[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/servicos")
      .then((res) => res.json())
      .then((data) => setServicos(data))
      .catch((err) => {
        console.error("Erro ao carregar servicos:", err);
        alert("Não foi possivel carregar os servicos");
      });
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este servico?"
    );
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3001/servicos/${id}`, {
        method: "DELETE",
      });
      setServicos((prev) => prev.filter((servico) => servico.id !== id));
      alert("Servico excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir Servico:", err);
      alert("Erro ao excluir Servico.");
    }
  };

  const [filtro, setFiltro] = useState<string>("");

  const servicosFiltrados = useMemo(() => {
    if (!filtro) return servicos;
    return servicos.filter(
      (servico) =>
        servico.id.toLowerCase().includes(filtro.toLowerCase()) ||
        servico.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [servicos, filtro]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  return (
    <div className="container-tipos">
      <div className="container-cli-pro-ser">
        <h2>Serviços</h2>
        <div className="search-session">
          <Link to={"/cadastroservico"} style={{ color: "inherit" }}>
            <div className="button-cadastro">
              <span>Cadastrar Serviço</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="table-component" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th className="descricao-tabela">Descrição</th>
              <th>Valor</th>
              <th className="ultimacoluna"></th>
            </tr>
          </thead>
          <tbody>
            {servicosFiltrados.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.nome}</td>
                <td className="descricao">{servico.descricao}</td>
                <td>R$ {servico.valor}</td>
                <td className="ultimacoluna">
                  <div className="botoes-acao">
                    <button
                      onClick={() => handleDelete(servico.id)}
                      className="botao-excluir"
                      title="Excluir cliente"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Servico;