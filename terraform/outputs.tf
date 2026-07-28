output "orders_queue_url" {
  description = "URL da fila SQS de pedidos"
  value       = aws_sqs_queue.orders_queue.url
}

output "orders_queue_arn" {
  description = "ARN da fila SQS de pedidos"
  value       = aws_sqs_queue.orders_queue.arn
}