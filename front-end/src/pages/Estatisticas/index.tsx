import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const EstatisticaPage: React.FC = () => {
  const [estatisticas, setEstatisticas] = useState<any[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState<"produto" | "servico" | null>(
    null
  );
  const [ordemProduto, setOrdemProduto] = useState<
    "Ascendente" | "Descrescente"
  >("Descrescente");
  const [ordemServico, setOrdemServico] = useState<
    "Ascendente" | "Descrescente"
  >("Descrescente");
  const [maisConsumidos, setMaisConsumidos] = useState<{
    produtos: { id: string; nome: string; quantidade: number }[];
    servicos: { id: string; nome: string; quantidade: number }[];
  }>({ produtos: [], servicos: [] });

  useEffect(() => {
    fetch("http://localhost:3001/estatisticas/consumo")
      .then((res) => res.json())
      .then(setEstatisticas)
      .catch((err) => {
        console.error("Erro ao buscar estatísticas:", err);
        alert("Erro ao carregar estatísticas");
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/estatisticas/produtos-servicos")
      .then((res) => res.json())
      .then(setMaisConsumidos)
      .catch((err) => console.error("Erro ao buscar mais consumidos:", err));
  }, []);

  return (
    <div className="container-estatisticas">
      <div className="header-estatisticas">
        <h2>Estatísticas e Listagens</h2>
        <Link to={"/registrarconsumo"}>
          <button className="consumir-button">
            <span>Consumir Produtos ou Servicos</span>
          </button>
        </Link>
      </div>

      <div className="title-top-10">
        <p>
          10 clientes que mais consumiram produtos ou serviços,{" "}
          <b>em quantidade.</b>
        </p>
      </div>
      <div className="table-component-listagem" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>
                <div className="dropdown-filter">
                  Produtos
                  <select
                    className="genero-dropdown"
                    value={filtroAtivo === "produto" ? ordemProduto : ""}
                    onChange={(e) => {
                      setFiltroAtivo("produto");
                      setOrdemProduto(
                        e.target.value as "Ascendente" | "Descrescente"
                      );
                    }}
                  >
                    <option value="">--</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descrescente">Descrescente</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="dropdown-filter">
                  Serviços
                  <select
                    className="genero-dropdown"
                    value={filtroAtivo === "servico" ? ordemServico : ""}
                    onChange={(e) => {
                      setFiltroAtivo("servico");
                      setOrdemServico(
                        e.target.value as "Ascendente" | "Descrescente"
                      );
                    }}
                  >
                    <option value="">--</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descrescente">Descrescente</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {estatisticas
              .slice()
              .sort((a, b) => {
                if (filtroAtivo === "produto") {
                  return ordemProduto === "Ascendente"
                    ? a.quantidadeProduto - b.quantidadeProduto
                    : b.quantidadeProduto - a.quantidadeProduto;
                }

                if (filtroAtivo === "servico") {
                  return ordemServico === "Ascendente"
                    ? a.quantidadeServico - b.quantidadeServico
                    : b.quantidadeServico - a.quantidadeServico;
                }
                return (
                  b.quantidadeProduto +
                  b.quantidadeServico -
                  (a.quantidadeProduto + a.quantidadeServico)
                );
              })
              .map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.quantidadeProduto}</td>
                  <td>{cliente.quantidadeServico}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="title-top-10-valor">
        <p>
          Listagem dos 5 clientes que mais consumiram <b>em valor</b> (soma).
        </p>
      </div>

      <div className="table-component-listagem" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Produtos</th>
              <th>Serviços</th>
            </tr>
          </thead>
          <tbody>
            {estatisticas
              .sort(
                (a, b) =>
                  b.valorProduto +
                  b.valorServico -
                  (a.valorProduto + a.valorServico)
              )
              .slice(0, 5)
              .map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>R$ {cliente.valorProduto.toFixed(2)}</td>
                  <td>R$ {cliente.valorServico.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="title-top-10-valor">
        <p>Top 5 produtos mais consumidos:</p>
      </div>
      <div className="table-component-listagem" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {maisConsumidos.produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="title-top-10-valor">
        <p>Top 5 serviços mais consumidos:</p>
      </div>
      <div className="table-component-listagem" role="region" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {maisConsumidos.servicos.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.nome}</td>
                <td>{s.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstatisticaPage;