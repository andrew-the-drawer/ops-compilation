data "aws_caller_identity" "main" {}

data "aws_region" "main" {}

data "aws_ecr_repository" "repo" {
  name = "${var.ecr_repo_name}"
}

data "aws_service_discovery_dns_namespace" "dns" {
  name = var.service_discovery_namespace
  type = "DNS_PRIVATE"
}