import { Module } from '@nestjs/common';

import { AppConfigService } from '../services';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';

@Module({
  imports: [],
  controllers: [UploadFileController],
  providers: [UploadFileService, AppConfigService],
})
export class UploadFileModule {}
