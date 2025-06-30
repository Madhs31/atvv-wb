import React, { useState, useMemo, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

interface ICliente {
  id: number;
  nome: string;
  genero: string;
  cpf: string;
  rg: string;
  telefone: string;
}

const Cliente: React.FC = () => {
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [filtroGenero, setFiltroGenero] = useState<string>("Todos");

  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
        alert("Não foi possível carregar os clientes.");
      });
  }, []);

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((cliente) => {
      const matchNomeCpf =
        cliente.cpf.includes(filtro) ||
        cliente.nome.toLowerCase().includes(filtro.toLowerCase());
      const matchGenero =
        filtroGenero === "Todos" || cliente.genero === filtroGenero;
      return matchNomeCpf && matchGenero;
    });
  }, [clientes, filtro, filtroGenero]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3001/clientes/${id}`, {
        method: "DELETE",
      });
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
      alert("Cliente excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      alert("Erro ao excluir cliente.");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroGenero(e.target.value);
  };

  return (
    <div className="container-tipos">
      <div className="container-cli-pro-ser">
        <h2>Clientes</h2>
        <div className="search-session">
          <Link to={"/cadastrocliente"} style={{ color: "inherit" }}>
            <div className="button-cadastro">
              <span>Cadastrar Cliente</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="table-component" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>
                <div className="dropdown-filter">
                  Gênero
                  <select
                    value={filtroGenero}
                    onChange={handleGeneroChange}
                    className="genero-dropdown"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </th>
              <th>CPF</th>
              <th>RG</th>
              <th>Telefone</th>
              <th className="ultimacoluna">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.genero}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.rg}</td>
                <td>{cliente.telefone}</td>
                <td className="ultimacoluna">
                  <div className="botoes-acao">
                    <button
                      onClick={() => handleDelete(cliente.id)}
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

export default Cliente;
