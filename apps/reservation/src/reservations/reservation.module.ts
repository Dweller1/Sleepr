import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { CommonLogger, DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, CommonLogger],
  controllers: [ReservationController],
  providers: [],
})
export class ReservationModule {}
