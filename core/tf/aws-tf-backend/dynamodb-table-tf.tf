resource "aws_dynamodb_table" "tf_state_lock" {
  name = local.dynamodb_table
  hash_key = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
  billing_mode = "PAY_PER_REQUEST"
}