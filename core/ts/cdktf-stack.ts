import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

export interface ICdkTfStackConfig {
  isPureModule?: boolean;
}

export class CdkTfStack extends TerraformStack {
  constructor(
    scope: Construct,
    name: string,
    protected readonly config: ICdkTfStackConfig,
  ) {
    super(scope, name);
    if (config.isPureModule) {
      this.convertToPureModule();
    }
  }

  private convertToPureModule() {
    if (this.config.isPureModule) {
      this.addOverride('terraform.backend', undefined);
      this.addOverride('provider', undefined);
    }
  }
}
