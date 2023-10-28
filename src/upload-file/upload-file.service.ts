import { Injectable, BadRequestException } from '@nestjs/common';
import { AppConfigService } from '../services/config/config.service';

import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadFileService {
  private s3: S3;
  private readonly bucketName: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  constructor(
    private configService: AppConfigService,
  ) {
    const { bucketName, accessKeyID, secretAccessKey } = this.configService.getS3BucketConfigs();
    this.bucketName = bucketName;
    this.accessKeyId = accessKeyID;
    this.secretAccessKey = secretAccessKey;
    this.s3 = new S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }

  async uploadFile(file): Promise<any> {
    if (!file) throw new BadRequestException('no file exist');
    const { buffer, originalname } = file;
    try {
      var base64data = Buffer.from(buffer, 'binary');
      const uploadResult = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: base64data,
          Key: `${uuid()}-${originalname}`,
        })
        .promise();

      return uploadResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteFile(fileKey): Promise<any> {
    try {
      const deletedFile = await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();

      return deletedFile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
