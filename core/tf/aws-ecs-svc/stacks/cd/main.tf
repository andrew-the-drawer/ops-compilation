terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.50.0"
    }
    external = {
      source = "hashicorp/external"
      version ="~> 2.2.3"
    }
    local = {
      source = "hashicorp/local"
      version = "~> 2.3.0"
    }
  }
  backend "s3" {}
}

provider "aws" {
  assume_role {
    role_arn = var.ecs_assumed_role_arn
  }
}

locals {
  ssmArnPrefix = format(
    "arn:aws:ssm:%s:%s:parameter/ecs/task-family/%s", 
    data.aws_region.main.name,
    data.aws_caller_identity.main.account_id,
    var.ecs_task_family
  )
  cwlGrpName = "${var.cwl_group_full_name}"
}