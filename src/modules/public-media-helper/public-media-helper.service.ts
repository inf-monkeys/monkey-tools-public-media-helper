import { CacheManager } from '@/common/cache/impelements';
import { LockManager } from '@/common/lock/impelements';
import { logger } from '@/common/logger';
import { S3Helpers } from '@/common/s3';
import { getMimeType } from '@/common/utils/file';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { nanoid } from 'nanoid';

@Injectable()
export class PublicMediaHelperService {
  constructor(
    @Inject('CACHE') private readonly cacheManager: CacheManager,
    @Inject('LOCK') private readonly lockManager: LockManager,
  ) { }

  public async uploadFileToPublicS3(
    fileUrl: string,
    contentType?: string,
    fileUrlRegex?: string,
    fileUrlReplace?: string,
  ) {

    if (!fileUrl) {
      throw new Error('File URL is required');
    }

    const regex = fileUrlRegex && fileUrlRegex.trim() != '' ? new RegExp(fileUrlRegex, 'g') : null;

    const url = regex ? fileUrl.replace(regex, fileUrlReplace) : fileUrl;

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const fileContentType = contentType || response.headers['content-type'] || getMimeType(url);

      const fileExtension = url.split('.').pop();

      const fileKey = `tools/public-media-helper/${nanoid()}.${fileExtension}`;

      const fileBuffer = response.data;

      const s3 = new S3Helpers();

      const result = await s3.uploadFile(fileBuffer, fileKey, fileContentType);

      logger.info(`${fileUrl} -> ${result}`);

      return result;

    } catch (error) {
      logger.error(`${fileUrl} Error: ${error}`);
      throw new Error(`Failed to upload file to public S3: ${error}`);
    }
  }
}
