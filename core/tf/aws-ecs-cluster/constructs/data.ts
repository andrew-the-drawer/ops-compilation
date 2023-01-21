import { Construct } from 'constructs';
import { dataAwsVpc, dataAwsAcmCertificate } from '../.gen/providers/aws';

export type TDataSourceConstructInput = {
  vpcId: string;
  albCertDomain: string;
};

export class DataSourceConstruct extends Construct {
  vpcDataSrc: dataAwsVpc.DataAwsVpc;
  albDefaultCert: dataAwsAcmCertificate.DataAwsAcmCertificate;
  constructor(
    scope: Construct,
    name: string,
    input: TDataSourceConstructInput,
  ) {
    super(scope, name);
    this.vpcDataSrc = new dataAwsVpc.DataAwsVpc(this, 'main-vpc', {
      id: input.vpcId,
    });
    this.albDefaultCert = new dataAwsAcmCertificate.DataAwsAcmCertificate(
      this,
      'https-cert',
      {
        domain: input.albCertDomain,
      },
    );
  }
}
