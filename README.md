 # AWS E-commerce com Terraform

Projeto de infraestrutura e microsserviços desenvolvido como atividade do Capacita iRede, utilizando AWS, Terraform e Node.js.

## Tecnologias utilizadas

- AWS
- Terraform
- Amazon EC2
- Amazon SQS
- Node.js
- Express
- AWS SDK for JavaScript
- Nginx
- Git e GitHub

## Infraestrutura AWS

A infraestrutura é provisionada utilizando Terraform e inclui:

- VPC
- Subnet pública
- Internet Gateway
- Route Table
- Security Group
- EC2
- Amazon SQS

## API de Produtos

API REST desenvolvida com Node.js e Express.

Principais operações:

- Listar produtos
- Consultar produto por ID
- Cadastrar produto
- Atualizar produto
- Excluir produto

## API de Pedidos

API REST responsável pelo gerenciamento dos pedidos.

Ao criar um novo pedido, a aplicação envia uma mensagem para uma fila do Amazon SQS utilizando o AWS SDK.

## Fluxo de pedidos

```text
Cliente
   |
   v
API de Pedidos
   |
   v
AWS SDK
   |
   v
Amazon SQS
   |
   v
Fila de Pedidos
```

## Terraform

Principais comandos utilizados:

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

## Objetivo

O projeto demonstra na prática conceitos de:

- Cloud Computing
- Infraestrutura como Código (IaC)
- APIs REST
- Microsserviços
- Mensageria assíncrona
- Amazon SQS
- Provisionamento de infraestrutura com Terraform
- Versionamento com Git e GitHub