import { TerraformVariable } from 'cdktf';
import { Construct } from 'constructs';

type TVariableRecord = Record<string, TerraformVariable>;

export abstract class CdkTfMainConstruct extends Construct {
  protected abstract defineInput(): TVariableRecord;
  protected getInput(): TVariableRecord {
    const input = this.defineInput();
    this.santizeInput(input);
    return input;
  }

  protected santizeInput(input: TVariableRecord) {
    Object.entries(input).forEach(([key, variable]) => {
      variable.overrideLogicalId(key);
    });
  }

  protected abstract defineOutput(): void;
}
