import { ChainableTemporaryCredentials, Credentials } from 'aws-sdk';

export const getAwsTempCredWithRole = (
  roleArn: string,
  sessionNamePrefix: string,
  masterCred?: Credentials,
) => {
  return new ChainableTemporaryCredentials({
    params: {
      RoleArn: roleArn,
      RoleSessionName: `${sessionNamePrefix}-${
        Math.random().toString().split('.')[1]
      }`,
    },
    ...(masterCred ? { masterCredentials: masterCred } : {}),
  });
};
