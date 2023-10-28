import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
export interface IEnvironment extends NodeJS.ProcessEnv {
  PORT: string;
  AWS_BUCKET_NAME: string;
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
}

const env: IEnvironment = process.env as IEnvironment;

export interface IConfig {
  port: number;
  s3bucket: S3BucketConfig;
}

export interface S3BucketConfig {
  bucketName: string;
  accessKeyID: string;
  secretAccessKey: string;
}

export enum ConfigKeys {
  PORT = 'port',
  S3BUCKET = 's3bucket'
}

export const configuration = (): IConfig => ({
  port: Number(env.PORT) || 3001,
  s3bucket: {
    bucketName: env.AWS_BUCKET_NAME,
    accessKeyID: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  getPort(): number {
    return this.config.get<number>(ConfigKeys.PORT);
  }

  getS3BucketConfigs(): S3BucketConfig {
    return this.config.get<S3BucketConfig>(ConfigKeys.S3BUCKET);
  }

}
