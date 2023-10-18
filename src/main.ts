import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({ origin: '*', credentials: true });
  app.enableCors();
  await app.listen(process.env.PORT ? process.env.PORT : 3001);
}
bootstrap();
