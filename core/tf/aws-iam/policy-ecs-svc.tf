resource "aws_iam_policy" "ecs_task_def_rw" {
  name = "ReadAndRegisterECSTaskDefinition"
  path = "/"
  description = "A policy allowing to read and register ECS task definition"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TaskDef1",
      "Effect": "Allow",
      "Action": [
        "ecs:DeregisterTaskDefinition",
        "ecs:RegisterTaskDefinition",
        "ecs:ListTaskDefinitions",
        "ecs:DescribeTaskDefinition",
        "iam:GetRole",
        "ecr:DescribeRepositories"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PassRole",
      "Effect": "Allow",
      "Action": [
        "iam:PassRole",
        "ecr:ListTagsForResource"
      ],
      "Resource": "*",
       "Condition": {
        "StringEquals": {
          "aws:ResourceTag/team": "$${aws:PrincipalTag/team}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_policy" "ecs_svc" {
  name = "FullyUpdateECSService"
  path = "/"
  description = "A policy allowing to fully update ECS service"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Search",
      "Effect": "Allow",
      "Action": [
        "servicediscovery:ListNamespaces",
        "servicediscovery:ListServices",
        "ecs:ListClusters",
        "servicediscovery:ListTagsForResource"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Read",
      "Effect": "Allow",
      "Action": [
        "servicediscovery:GetNamespace",
        "servicediscovery:GetService",
        "ecs:DescribeClusters",
        "ecs:ListTagsForResource"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/team": "$${aws:PrincipalTag/team}"
        }
      }
    }
  ]
}
EOF
}
