import { TerraformOutput, TerraformVariable, VariableType } from 'cdktf';
import { Construct } from 'constructs';
import { CdkTfMainConstruct } from '../../../lib/cdktf-main-construct';
import { EcsClusterConstruct } from './cluster';
import { DataSourceConstruct } from './data';
import { ALBConstruct } from './load-balancer';
import { ClusterSecurityGroupConstruct } from './security-groups';
import { ServiceDiscoveryConstruct } from './service-discovery';

export class MainConstruct extends CdkTfMainConstruct {
  clusterConstruct: EcsClusterConstruct;
  lbConstruct: ALBConstruct;
  securityGroupConstruct: ClusterSecurityGroupConstruct;
  svcDiscoveryConstruct: ServiceDiscoveryConstruct;
  dataSrcConstruct: DataSourceConstruct;
  constructor(scope: Construct, name: string) {
    super(scope, name);
    const {
      clusterName,
      vpcId,
      albSgName,
      ecsSvcSgName,
      albName,
      subnetIds,
      dnsNamespaceName,
      albCertDomain,
    } = this.getInput();

    this.clusterConstruct = new EcsClusterConstruct(this, 'ecs-cluster', {
      clusterName: clusterName.value,
    });

    this.dataSrcConstruct = new DataSourceConstruct(this, 'data-src', {
      vpcId: vpcId.value,
      albCertDomain: albCertDomain.value,
    });

    this.securityGroupConstruct = new ClusterSecurityGroupConstruct(
      this,
      'sg',
      {
        albSgName: albSgName.value,
        ecsSvcSgName: ecsSvcSgName.value,
        vpcCidrBlock: this.dataSrcConstruct.vpcDataSrc.cidrBlock,
        vpcId: vpcId.value,
      },
    );

    this.lbConstruct = new ALBConstruct(this, 'lb', {
      albName: albName.value,
      subnetIds: subnetIds.value,
      securityGroupIds: [this.securityGroupConstruct.albSg.id],
      certArn: this.dataSrcConstruct.albDefaultCert.arn,
    });

    this.svcDiscoveryConstruct = new ServiceDiscoveryConstruct(
      this,
      'svc-discovery',
      {
        dnsNamespaceName: dnsNamespaceName.value,
        vpcId: vpcId.value,
      },
    );

    this.defineOutput();
  }

  protected defineInput() {
    return {
      clusterName: new TerraformVariable(this, 'clusterName', {
        type: 'string',
        description: 'ECS cluster name',
      }),
      vpcId: new TerraformVariable(this, 'vpcId', {
        type: 'string',
        description: 'main VPC ID',
      }),
      albName: new TerraformVariable(this, 'albName', {
        type: 'string',
        description: 'Name of the ALB',
      }),
      albSgName: new TerraformVariable(this, 'albSgName', {
        type: 'string',
        description: 'Name of the ALB security group',
      }),
      subnetIds: new TerraformVariable(this, 'subnetIds', {
        type: VariableType.list('string'),
        description: 'List of subnet IDs (applied to ALB)',
      }),
      ecsSvcSgName: new TerraformVariable(this, 'ecsSvcSgName', {
        type: 'string',
        description: 'SG name (applied to ECS service)',
      }),
      dnsNamespaceName: new TerraformVariable(this, 'dnsNamespaceName', {
        type: 'string',
        description: 'Name of private DNS/Service discovery namespace',
      }),
      albCertDomain: new TerraformVariable(this, 'albCertDomain', {
        type: 'string',
        description:
          'HTTPS cert domain (used to search for ACM cert applied to ALB)',
      }),
    };
  }

  protected defineOutput() {
    new TerraformOutput(this, 'ecsSvcSgId', {
      description: 'ECS service security group ID',
      value: this.securityGroupConstruct.ecsSvcSg.id,
    });
  }
}
