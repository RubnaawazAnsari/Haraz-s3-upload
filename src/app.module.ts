import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService, configuration } from './services';
import { UploadFileController } from './upload-file/upload-file.controller';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadFileService } from './upload-file/upload-file.service';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UploadFileModule,
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService, AppConfigService, AppService],
})
export class AppModule {}
