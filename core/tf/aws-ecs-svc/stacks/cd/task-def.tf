data "external" "format_container_def" {
  program = [
    "npx", "ts-node", "${path.module}/format-container-def.ts"
  ]
  query = {
    assumeRoleArn = var.ecs_assumed_role_arn
    defaultLatestImage = "${data.aws_ecr_repository.repo.repository_url}:latest"
    ssmArnPrefix = local.ssmArnPrefix
    cwlGroup = local.cwlGrpName
    mainContainerName = var.ecs_main_container_name
    family = var.ecs_task_family
    awsRegion = data.aws_region.main.name
  }
}

data "local_file" "container_def" {
  filename = ".output/container-def.json"
  depends_on = [
    data.external.format_container_def
  ]
}

resource "aws_ecs_task_definition" "task_def" {
  family                = var.ecs_task_family
  container_definitions = data.local_file.container_def.content
  execution_role_arn = data.aws_iam_role.exec_role.arn
  requires_compatibilities = ["FARGATE"]
  cpu = 256
  memory = 512
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "X86_64"
  }
  network_mode = "awsvpc"
}