variable "ecr_repo_name" {
  type = string
  description = "ECR repo name"
}

variable "ecs_task_family" {
  type = string
  description = "ECS task family"
}

variable "ecs_assumed_role_arn" {
  type = string
  description = "Role to assume in order to update ECS tasks"
}

variable "ecs_main_container_name" {
  type = string
  description = "ECS task definition main container"
}

variable "cwl_group_full_name" {
  type = string
  description = "Cloudwatch log group full name"
}

variable "ecs_exec_role_name" {
  type = string
  description = "Execution role name. Cannot exceeds 64 chars"
}

variable "service_discovery_namespace" {
  type = string
  description = "CloudMap namespace"
}

variable "cluster_name" {
  type = string
  description = "ECS cluster name"
}