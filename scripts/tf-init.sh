#!/bin/bash
terraform -chdir=$TF_DIR init \
  -backend-config="bucket=$S3_BUCKET" \
  -backend-config="key=$S3_KEY" \
  -backend-config="dynamodb_table=$DYNAMODB_TABLE";