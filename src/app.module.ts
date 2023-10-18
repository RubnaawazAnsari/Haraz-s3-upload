import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileModule } from './upload-file/upload-file.module';
import { ConfigService } from '@nestjs/config';
import { UploadFileService } from './upload-file/upload-file.service';

@Module({
  imports: [UploadFileModule],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class AppModule {}
