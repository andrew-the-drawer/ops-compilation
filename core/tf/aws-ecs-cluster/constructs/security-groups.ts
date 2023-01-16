import { Construct } from 'constructs';
import { securityGroup } from '../.gen/providers/aws';

export type TClusterSecurityGroupConfig = {
  ecsSvcSgName: string;
  albSgName: string;
  vpcId: string;
  vpcCidrBlock: string;
};

export class ClusterSecurityGroupConstruct extends Construct {
  albSg: securityGroup.SecurityGroup;
  ecsSvcSg: securityGroup.SecurityGroup;
  constructor(
    scope: Construct,
    name: string,
    config: TClusterSecurityGroupConfig,
  ) {
    super(scope, name);
    const allowOutboundTrafficEgressRule = [
      {
        fromPort: 0,
        toPort: 0,
        protocol: '-1',
        cidrBlocks: ['0.0.0.0/0'],
        ipv6CidrBlocks: ['::/0'],
        selfAttribute: false,
        description: 'Allow all outbound traffic',
      },
    ];
    this.albSg = new securityGroup.SecurityGroup(this, 'alb-sg', {
      name: config.albSgName,
      vpcId: config.vpcId,
      description: `SG for ALB`,
      ingress: [
        {
          fromPort: 443,
          toPort: 443,
          protocol: 'tcp',
          cidrBlocks: ['0.0.0.0/0'],
          ipv6CidrBlocks: ['::/0'],
          selfAttribute: false,
          description: 'Allow public access via HTTPS',
        },
      ],
      egress: allowOutboundTrafficEgressRule,
    });
    this.ecsSvcSg = new securityGroup.SecurityGroup(this, 'ecs-svc-sg', {
      name: config.albSgName,
      vpcId: config.vpcId,
      description: `SG for ECS service in the project`,
      ingress: [
        {
          fromPort: 0,
          toPort: 65535,
          protocol: 'tcp',
          cidrBlocks: [config.vpcCidrBlock],
          selfAttribute: false,
          description: 'Allow access to any ports for VPC-internal traffic',
        },
      ],
      egress: allowOutboundTrafficEgressRule,
    });
  }
}
