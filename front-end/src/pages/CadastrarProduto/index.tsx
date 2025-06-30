import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CadastroProduto = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    nome: "",
    descricao: "",
    valor: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      alert("Produto cadastrado com sucesso!");
      console.log(data);
      navigate("/produto")
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar Produto");
    }
  };

  return (
    <div className="container-cadastro">
      <div className="title-cadastro">
        <h2>Cadastre um produto</h2>
      </div>
      <div className="form-cadastro">
        <form onSubmit={handleSubmit}>
          <p>ID:</p>
          <input
            name="id"
            type="text"
            value={form.id}
            placeholder="Digite o id do produto"
            onChange={handleChange}
            required
          />
          <p>Nome do Produto:</p>
          <input
            name="nome"
            type="text"
            value={form.nome}
            placeholder="Digite o nome do produto"
            onChange={handleChange}
            required
          />
          <p>Descrição:</p>
          <input
            name="descricao"
            type="text"
            value={form.descricao}
            placeholder="Digite a descrição do produto"
            onChange={handleChange}
            required
          />
          <p>Valor:</p>
          <input
            name="valor"
            type="number"
            value={form.valor}
            placeholder="Digite o valor do produto"
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroProduto;