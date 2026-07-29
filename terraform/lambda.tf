# Compacta o código JavaScript da função Lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../lambda/index.js"
  output_path = "${path.module}/lambda_function.zip"
}

# Role utilizada pela função Lambda
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Permissão básica para a Lambda escrever logs no CloudWatch
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Permissão para a Lambda consumir mensagens do SQS
resource "aws_iam_role_policy_attachment" "lambda_sqs_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole"
}

# Função que processará os pedidos recebidos
resource "aws_lambda_function" "orders_processor" {
  function_name = "${var.project_name}-orders-processor"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  role    = aws_iam_role.lambda_role.arn
  handler = "index.handler"
  runtime = "nodejs20.x"

  timeout = 10

  tags = {
    Project = var.project_name
  }
}

# Liga a fila SQS à função Lambda
resource "aws_lambda_event_source_mapping" "orders_queue_trigger" {
  event_source_arn = aws_sqs_queue.orders_queue.arn
  function_name    = aws_lambda_function.orders_processor.arn

  batch_size = 10

  depends_on = [
    aws_iam_role_policy_attachment.lambda_sqs_execution
  ]
}