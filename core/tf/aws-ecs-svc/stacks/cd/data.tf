data "aws_caller_identity" "main" {}

data "aws_region" "main" {}

data "aws_ecr_repository" "repo" {
  name = "${var.ecr_repo_name}"
}

data "aws_iam_role" "exec_role" {
  name = var.ecs_exec_role_name
}

data "aws_service_discovery_dns_namespace" "dns" {
  name = var.service_discovery_namespace
  type = "DNS_PRIVATE"
}

data "aws_service_discovery_service" "svc" {
  name          = "${var.ecs_task_family}"
  namespace_id  = data.aws_service_discovery_dns_namespace.dns.id
}

data "aws_ecs_cluster" "main" {
  cluster_name = "${var.cluster_name}"
}