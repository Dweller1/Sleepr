import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule, { bufferLogs: true });

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
bootstrap();
