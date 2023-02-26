resource "aws_iam_role" "ecs_svc_deployer" {
  name = "ECSServiceTerraformDeployer_${local.team}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Sid": "Sid1",
      "Principal": {
        "AWS": "${data.aws_caller_identity.main.account_id}"
      },
      "Condition": {  
        "StringEquals": {
          "aws:PrincipalTag/isTfDeployer": "yes",
          "aws:PrincipalTag/team": "${local.team}"
        }
      }
    }
  ]
}
EOF
  tags = {
    team = local.team
  }
}

resource "aws_iam_role_policy_attachment" "attachment_1" {
  role       = aws_iam_role.ecs_svc_deployer.name
  policy_arn = aws_iam_policy.ecs_task_def_rw.arn
}

resource "aws_iam_role_policy_attachment" "attachment_2" {
  role       = aws_iam_role.ecs_svc_deployer.name
  policy_arn = aws_iam_policy.ecs_svc.arn
}


