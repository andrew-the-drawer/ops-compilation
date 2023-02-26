resource "aws_iam_role" "execution_role" {
  name = "${var.ecs_task_family}_ECSTaskExecutor"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "at1" {
  role       = aws_iam_role.execution_role.name
  policy_arn = aws_iam_policy.upload_log_2_cwl.arn
}

resource "aws_iam_role_policy_attachment" "at2" {
  role       = aws_iam_role.execution_role.name
  policy_arn = aws_iam_policy.bootstrap_image.arn
}
