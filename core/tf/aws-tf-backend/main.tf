terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.50.0"
    }
  }
}

locals {
  s3_bucket = "tf-state"
  dynamodb_table = "tf-state-locks"
}