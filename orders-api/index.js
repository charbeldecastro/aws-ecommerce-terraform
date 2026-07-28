const express = require("express");

const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const app = express();
const PORT = 3001;
const sqs = new SQSClient({
  region: "us-east-1"
});

const QUEUE_URL =
  "https://sqs.us-east-1.amazonaws.com/899535647565/aws-ecommerce-terraform-orders-queue";

app.use(express.json());

const pedidos = [
  {
    id: 1,
    produtoId: 1,
    quantidade: 1,
    status: "recebido"
  },
  {
    id: 2,
    produtoId: 3,
    quantidade: 2,
    status: "recebido"
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "API de Pedidos funcionando!"
  });
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

app.post("/pedidos", async (req, res) => {
  const novoPedido = {
    id: pedidos.length + 1,
    produtoId: req.body.produtoId,
    quantidade: req.body.quantidade,
    status: "recebido"
  };

  try {
    await sqs.send(
      new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(novoPedido)
      })
    );

    pedidos.push(novoPedido);

    res.status(201).json({
      message: "Pedido criado e enviado para a fila SQS!",
      pedido: novoPedido
    });
  } catch (error) {
    console.error("Erro ao enviar pedido para o SQS:", error);

    res.status(500).json({
      message: "Erro ao enviar pedido para o SQS"
    });
  }
});

app.post("/pedidos", (req, res) => {
  const novoPedido = {
    id: pedidos.length + 1,
    produtoId: req.body.produtoId,
    quantidade: req.body.quantidade,
    status: "recebido"
  };

  pedidos.push(novoPedido);

  res.status(201).json({
    message: "Pedido criado com sucesso!",
    pedido: novoPedido
  });
});

app.listen(PORT, () => {
  console.log(`API de Pedidos rodando na porta ${PORT}`);
});