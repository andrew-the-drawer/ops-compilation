import { App, S3Backend } from 'cdktf';
import { Construct } from 'constructs';
import { CdkTfStack, ICdkTfStackConfig } from '../../lib/cdktf-stack';
import { provider } from './.gen/providers/aws';
import { MainConstruct } from './constructs';

interface IMainStackConfg extends ICdkTfStackConfig {
  isPureModule?: boolean;
  s3Bucket?: string;
  s3Key?: string;
  dynamoDbTable?: string;
}

export class MainStack extends CdkTfStack {
  awsProvider?: provider.AwsProvider;
  constructor(
    scope: Construct,
    name: string,
    protected readonly config: IMainStackConfg,
  ) {
    super(scope, name, config);
    this.addAwsProvider();
    this.addS3Backend();
    new MainConstruct(this, 'main-construct');
  }

  private addAwsProvider() {
    this.awsProvider = new provider.AwsProvider(this, 'aws', {});
  }

  private addS3Backend() {
    new S3Backend(this, {
      bucket: this.config.s3Bucket || '',
      key: this.config.s3Key || '',
      dynamodbTable: this.config.dynamoDbTable || '',
    });
  }
}

const main = () => {
  const app = new App();
  new MainStack(app, 'aws-ecs-cluster-module', {
    isPureModule: true,
  });

  new MainStack(app, 'aws-ecs-cluster', {
    s3Bucket: process.env.S3_BUCKET,
    s3Key: process.env.S3_KEY,
    dynamoDbTable: process.env.DYNAMO_DB_TABLE,
  });
  app.synth();
};

main();
