import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as dotenv from 'dotenv';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
    snapshot: true,
    abortOnError: false,
  });

  app.useLogger(app.get(Logger));

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  const fs = require('fs');
  fs.writeFileSync(
    'graph.json',
    (global as any).PartialGraphHost?.toString() ?? '',
  );
  process.exit(1);
});
