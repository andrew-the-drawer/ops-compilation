terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.50.0"
    }
  }
  backend "s3" {}
}

provider "aws" {
  default_tags {
    tags = {
      team = var.team
    }
  }
}

locals {
  ssmArnPrefix = format(
    "arn:aws:ssm:%s:%s:parameter/ecs/task-family/%s", 
    data.aws_region.main.name,
    data.aws_caller_identity.main.account_id,
    var.ecs_task_family
  )
  cwlGrpName = "ecs/task-family/${var.cwl_group_name}"
}