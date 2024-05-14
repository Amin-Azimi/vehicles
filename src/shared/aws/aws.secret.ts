import { Inject, Injectable } from '@nestjs/common';
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { MODULE_OPTIONS } from './aws.constants';
import { AwsModuleConfig } from './aws.interfaces';

@Injectable()
export class AwsSecret {
  private readonly secretsManager: SecretsManagerClient;

  constructor(@Inject(MODULE_OPTIONS) private params: AwsModuleConfig) {

    this.secretsManager = new SecretsManagerClient({
      region: params.region,
    });
  }

  getSecret<T>(secretName: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.secretsManager.send(new GetSecretValueCommand({ SecretId: secretName }), (err, data) => {
        if (err) {
          console.error('getSecret error - ', err.message);
          reject(err);
        } else {
          // Decrypts secret using the associated KMS CMK.
          // Depending on whether the secret is a string or binary, one of these fields will be populated.
          if (data['SecretString']) {
            const params: T = JSON.parse(data.SecretString);
            resolve(params);
          } else {
            reject(new Error('No SecretString in request response'));
          }
        }
      });
    });
  }
}
