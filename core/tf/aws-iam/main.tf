terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.50.0"
    }
  }
  backend "s3" {}
}

provider "aws" {}


locals {
  general_tf_state_s3_bucket = "staging-sf-tf-state"
  tf_backend_dynamodb_lock_table = "staging-sf-tf-state-locks"
  team = "software"
}
