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

module "aws_ecr" {
  source = "../module"
  ecr_repo_name = var.ecr_repo_name
}