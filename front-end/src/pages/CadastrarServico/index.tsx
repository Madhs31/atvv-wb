import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CadastroServico = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    nome: "",
    descricao: "",
    valor: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      alert("Servico cadastrado com sucesso!");
      console.log(data);
      navigate("/servico");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar servico");
    }
  };
  return (
    <div className="container-cadastro">
      <div className="title-cadastro">
        <h2>Cadastre um Serviço</h2>
      </div>
      <div className="form-cadastro">
        <form onSubmit={handleSubmit}>
          <p>ID:</p>
          <input type="text" name="id" value={form.id} onChange={handleChange}  placeholder="Digite o ID do serviço" required/>
          <p>Nome do Serviço:</p>
          <input type="text" name="nome" value={form.nome} onChange={handleChange}  placeholder="Digite o nome do serviço" required/>
          <p>Descriçao:</p>
          <input type="text" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Digite a descriçao do serviço" required/>
          <p>Valor:</p>
          <input type="number" name="valor" value={form.valor} onChange={handleChange} placeholder="Digite o valor do serviço" required/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroServico;