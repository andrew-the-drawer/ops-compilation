resource "aws_iam_policy" "fetch_and_assume_role" {
  name = "FetchAndAssumeRole"
  path = "/"
  description = "A basic policy for every user to fetch and assume the correct roles"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GetRole",
      "Effect": "Allow",
      "Action": ["iam:GetRole", "iam:ListRoles", "sts:AssumeRole"],
      "Resource": "*"
    }
  ]
}
EOF
}