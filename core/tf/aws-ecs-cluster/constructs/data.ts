import { Construct } from 'constructs';
import { dataAwsVpc } from '../.gen/providers/aws';

export type TDataSourceConstructInput = {
  vpcId: string;
};

export class DataSourceConstruct extends Construct {
  vpcDataSrc: dataAwsVpc.DataAwsVpc;
  constructor(
    scope: Construct,
    name: string,
    input: TDataSourceConstructInput,
  ) {
    super(scope, name);
    this.vpcDataSrc = new dataAwsVpc.DataAwsVpc(this, 'main-vpc', {
      id: input.vpcId,
    });
  }
}
