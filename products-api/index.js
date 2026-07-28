const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Mouse", preco: 80 },
  { id: 3, nome: "Teclado", preco: 150 }
];

app.get("/", (req, res) => {
  res.json({
    message: "API de Produtos funcionando!"
  });
});

app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {

  const id = Number(req.params.id);
  const produto = produtos.find((produto) => produto.id === id);

  res.json(produto);
});

app.post("/produtos", (req, res) => {
  const novoProduto = {
    id: produtos.length + 1,
    nome: req.body.nome,
    preco: req.body.preco
  };

  produtos.push(novoProduto);

  res.status(201).json({
    message: "Produto cadastrado com sucesso!",
    produto: novoProduto
  });
});

app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      message: "Produto não encontrado"
    });
  }

  const produtoRemovido = produtos.splice(indice, 1);

  res.json({
    message: "Produto removido com sucesso!",
    produto: produtoRemovido[0]
  });
});

app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    return res.status(404).json({
      message: "Produto não encontrado"
    });
  }

  produto.nome = req.body.nome;
  produto.preco = req.body.preco;

  res.json({
    message: "Produto atualizado com sucesso!",
    produto: produto
  });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});