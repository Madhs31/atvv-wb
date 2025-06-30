import { useState } from "react";
import "./style.css";

const CadastroCliente = () => {
  const [form, setForm] = useState({
    nome: "",
    nomeSocial: "",
    genero: "",
    cpf: "",
    rg: "",
    telefone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      alert("Cliente cadastrado com sucesso!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="container-cadastro">
      <div className="title-cadastro">
        <h2>Cadastre um usuario</h2>
      </div>
      <div className="form-cadastro">
        <form onSubmit={handleSubmit}>
          <p>Nome:</p>
          <input
            name="nome"
            type="text"
            placeholder="Digite o nome do cliente"
            onChange={handleChange}
            required
          />
          <p>Nome Social:</p>
          <input
            name="nomeSocial"
            type="text"
            placeholder="Digite o nome social do cliente"
            onChange={handleChange}
            required
          />
          <p>Gênero:</p>
          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="input-genero"
            required
          >
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>

          <p>CPF:</p>
          <input
            name="cpf"
            type="text"
            placeholder="Digite o CPF do cliente"
            onChange={handleChange}
            required
          />
          <p>RG:</p>
          <input
            name="rg"
            type="text"
            placeholder="Digite o RG do cliente"
            onChange={handleChange}
            required
          />
          <p>Telefone:</p>
          <input
            name="telefone"
            type="text"
            placeholder="Digite o telefone do cliente"
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroCliente;