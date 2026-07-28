resource "aws_sqs_queue" "orders_queue" {
  name = "${var.project_name}-orders-queue"

  tags = {
    Name    = "${var.project_name}-orders-queue"
    Project = var.project_name
  }
}