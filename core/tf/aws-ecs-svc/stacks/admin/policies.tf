resource "aws_iam_policy" "bootstrap_image" {
  name = "ECSTaskBootstrapImage_${var.ecs_task_family}"
  description = "Allow task to pull ECR image"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetAuthorizationToken",
          "ssm:GetParameters"
        ]
        Effect   = "Allow"
        Resource = [
          "${data.aws_ecr_repository.repo.arn}",
          "${local.ssmArnPrefix}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_policy" "upload_log_2_cwl" {
  name = "ECSTaskUploadLogsToCloudwatch_${var.ecs_task_family}"
  description = "Allow task to upload logs to Cloudwatch"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
         Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = [
          format(
            "arn:aws:logs:%s:%s:log-group:%s",
            data.aws_region.main.name,
            data.aws_caller_identity.main.account_id,
            local.cwlGrpName
          )
        ]
      }
    ]
  })
}
