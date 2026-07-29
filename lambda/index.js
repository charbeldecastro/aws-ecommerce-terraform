exports.handler = async (event) => {
  console.log("Evento recebido do SQS:");

  for (const record of event.Records) {
    console.log("Pedido recebido:", record.body);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Pedidos processados com sucesso"
    })
  };
};