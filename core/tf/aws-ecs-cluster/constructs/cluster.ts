import { Construct } from 'constructs';
import { ecsCluster } from '../.gen/providers/aws';
import { ecsClusterCapacityProviders } from '../.gen/providers/aws';

export type TEcsClusterConstructConfig = {
  clusterName: string;
};

export class EcsClusterConstruct extends Construct {
  ecsCluster: ecsCluster.EcsCluster;
  capacityProviders: ecsClusterCapacityProviders.EcsClusterCapacityProviders;
  constructor(
    scope: Construct,
    name: string,
    config: TEcsClusterConstructConfig,
  ) {
    super(scope, name);
    this.ecsCluster = new ecsCluster.EcsCluster(this, 'aws-ecs-cluster', {
      name: config.clusterName,
    });
    this.capacityProviders =
      new ecsClusterCapacityProviders.EcsClusterCapacityProviders(
        this,
        'fargate-spot-cp',
        {
          clusterName: this.ecsCluster.name,
          capacityProviders: ['FARGATE_SPOT'],
        },
      );
  }
}
