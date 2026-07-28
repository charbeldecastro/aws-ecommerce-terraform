variable "aws_region" {
  description = "Região onde os recursos serão criados."
  type        = string
}

variable "project_name" {
  description = "Nome do projeto."
  type        = string
}

variable "vpc_cidr" {
  description = "Bloco CIDR da VPC."
  type        = string
}

variable "key_name" {
  description = "Nome da Key Pair da EC2"
  type        = string
}