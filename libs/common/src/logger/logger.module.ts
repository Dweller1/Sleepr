import { Module } from '@nestjs/common';
import { Logger, LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'basename',
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class CommonLogger {}
