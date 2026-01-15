import { AuthConfig, AuthType } from '../typings/manifest';
import { readConfig } from './readYaml';

export interface ServerConfig {
  port: number;
  auth: AuthConfig;
  appUrl: string;
}

export interface RedisConfig {
  url: string;
  prefix: string;
}

export interface S3Config {
  isPrivate: boolean;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  region: string;
  modelBucketName: string;
  bucket: string;
  publicAccessUrl: string;
  forcePathStyle: boolean;
}

export interface Config {
  server: ServerConfig;
  redis: RedisConfig;
  s3: S3Config;
}

const port = readConfig('server.port', 3000);

export const config: Config = {
  server: {
    port,
    auth: {
      type: readConfig('server.auth.type', AuthType.none),
      authorization_type: 'bearer',
      verification_tokens: {
        monkeys: readConfig('server.auth.bearerToken'),
      },
    },
    appUrl: readConfig('server.appUrl', `http://localhost:${port}`),
  },
  redis: {
    url: readConfig('redis.url'),
    prefix: readConfig('redis.prefix', 'monkeys:'),
  },
  s3: readConfig('s3', {}),
};

const validateConfig = () => {
  if (config.server.auth.type === AuthType.service_http) {
    if (!config.server.auth.verification_tokens['monkeys']) {
      throw new Error(
        'Invalid Config: auth.bearerToken must not empty when auth.type is service_http',
      );
    }
  }
};

validateConfig();
