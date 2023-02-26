variable "ecr_repo_name" {
  type = string
  description = "ECR repo name"
}

variable "ecs_task_family" {
  type = string
  description = "ECS task family"
}

variable "cwl_group_name" {
  type = string
  description = "Cloudwatch log group name without any folder (prefix)"
}

variable "cwl_grp_retention_in_days" {
  type = number
  description = "CWL group rentention in days, e.g 1, 5, 7, 30... Check AWS docs for exact details"
}

variable "service_discovery_namespace" {
  type = string
  description = "CloudMap namespace"
}

variable "service_dns_record_type" {
  type = string
  description = "type of DNS record in service discovery"
  validation {
    condition = var.service_dns_record_type == "A" || var.service_dns_record_type == "SRV"
    error_message = "Must be A or SRV."
  }
}

variable "team" {
  type = string
}