import { Construct } from 'constructs';
import { serviceDiscoveryPrivateDnsNamespace } from '../.gen/providers/aws';

export type TServiceDiscoveryConstructConfig = {
  dnsNamespaceName: string;
  vpcId: string;
};

export class ServiceDiscoveryConstruct extends Construct {
  dnsNamepsace: serviceDiscoveryPrivateDnsNamespace.ServiceDiscoveryPrivateDnsNamespace;
  constructor(
    scope: Construct,
    name: string,
    config: TServiceDiscoveryConstructConfig,
  ) {
    super(scope, name);
    this.dnsNamepsace =
      new serviceDiscoveryPrivateDnsNamespace.ServiceDiscoveryPrivateDnsNamespace(
        this,
        'ecs-svc-discovery',
        {
          name: config.dnsNamespaceName,
          vpc: config.vpcId,
          description: 'ECS discovery',
        },
      );
  }
}
