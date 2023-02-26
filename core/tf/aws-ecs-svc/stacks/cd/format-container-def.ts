import { ECS } from 'aws-sdk';
import fs from 'fs';
import { compile } from 'handlebars';
import jsYaml from 'js-yaml';
import path from 'path';
import { getAwsTempCredWithRole } from '../../../../lib/aws-helpers';
import {
  readFullInputFromStdin,
  removeNullValuesFromObject,
} from '../../../../lib/helpers';

type TInput = {
  assumeRoleArn: string;
  defaultLatestImage?: string;
  ssmArnPrefix: string;
  cwlGroup: string;
  mainContainerName: string;
  family: string;
  awsRegion: string;
};

type TInitEcsTaskInput = {
  assumeRoleArn: string;
};

const initEcsSdk = (input: TInitEcsTaskInput) => {
  return new ECS(
    getAwsTempCredWithRole(input.assumeRoleArn, 'Tf-register-task-def'),
  );
};

const getECSTaskDefData = (
  ecsSdk: ECS,
  family: string,
  mainContainerName: string,
) => {
  return new Promise<{
    ltsImageId: string | null;
    taskDef?: ECS.TaskDefinition;
  } | null>((resolve, reject) => {
    ecsSdk.describeTaskDefinition(
      {
        taskDefinition: family,
      },
      (err, data) => {
        if (err) {
          if (err.statusCode !== 400) {
            reject(err);
            return;
          }
          resolve(null);
          return;
        }
        const { taskDefinition } = data;
        resolve({
          ltsImageId:
            taskDefinition?.containerDefinitions?.find(
              (cont) => cont.name === mainContainerName,
            )?.image || null,
          taskDef: taskDefinition,
        });
      },
    );
  });
};

const main = async () => {
  const inputAsStr = await readFullInputFromStdin();
  const inputData = JSON.parse(inputAsStr) as TInput;
  const ecsSdk = initEcsSdk(inputData);
  const ecsTaskLtsData = await getECSTaskDefData(
    ecsSdk,
    inputData.family,
    inputData.mainContainerName,
  );

  const ltsImage = ecsTaskLtsData?.ltsImageId || inputData.defaultLatestImage;

  const ecsTaskTemplate = compile(
    fs.readFileSync(path.resolve(__dirname, 'container-def.yml'), 'utf-8'),
  );

  // render task def
  const taskDef = jsYaml.load(
    ecsTaskTemplate({
      cwlGroup: inputData.cwlGroup,
      mainContainerName: inputData.mainContainerName,
      family: inputData.family,
      ltsImage,
      awsRegion: inputData.awsRegion,
    }),
  ) as Pick<ECS.TaskDefinition, 'containerDefinitions'>;

  // reference secrets to SSM
  taskDef?.containerDefinitions?.forEach((container) => {
    container.secrets?.forEach((secret) => {
      secret.valueFrom = `${inputData.ssmArnPrefix}/${secret.name}`;
    });
  });

  // register task definition
  fs.mkdirSync('.output', { recursive: true });
  fs.writeFileSync(
    '.output/container-def.json',
    JSON.stringify(removeNullValuesFromObject(taskDef.containerDefinitions)),
  );
  process.stdout.write(JSON.stringify({ ok: 'yes' }));
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
