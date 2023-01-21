# Terraform stack: AWS ECS cluster
=========

A terraform module/stack to set up AWS ECS cluster with internet-facing ALB and HTTPS listener

Requirements
------------

- Terraform
- NodeJS
- AWS account (best with admin access)

How to run
--------------

- Bootstrap the entire repo: `npm install`
- `cd core/tf/aws-ecs-cluster`
- `npx cdktf synth`
- export some env variables as in `sample.env`
- Set up variable file `terraform.tfvars` inside `cdktf.out/stacks/aws-ecs-cluster`
```
clusterName = "web-staging" # name of the ECS cluster
vpcId = "vpc-id" # AWS VPC ID
albName = "alb-web-staging" # name of the internet-facing ALB
albSgName = "alb-web-staging-sg" # name of the security group (SG) applied to ALB
subnetIds = ["subnet-1", "subnet-2","subnet-3"] # list of the subnet IDs (belonging to VPC) applied to ALB
ecsSvcSgName = "web-staging-ecs-sg" # Name of the SG applied to ECS services (deployed to the ECS cluster)
dnsNamespaceName = "web-staging" # name of the DNS namespace used in the internal discovery service
albCertDomain = "*.example.com" # domain for ACM cert applied to ALB
```
- `npx cdktf deploy aws-ecs-cluster -var-file=./terraform.tfvars [--auto-approve]`

Dependencies
------------

- terraform
- cdktf

License
-------

MIT

