resource "aws_iam_policy" "tf_backend_s3" {
  name = "AccessTerraformS3Backend"
  path = "/"
  description = "A policy for Terraform deployers to access S3 backend"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::${local.general_tf_state_s3_bucket}"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::${local.general_tf_state_s3_bucket}/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:DescribeTable",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/${local.tf_backend_dynamodb_lock_table}"
    }
  ]
}
EOF
}
