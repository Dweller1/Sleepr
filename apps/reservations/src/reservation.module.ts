import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { CommonLogger, DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { Reservation, ReservationSchema } from './models/reservation.schema';

@Module({
  imports: [
    DatabaseModule,
    CommonLogger,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    // DevtoolsModule.register({
    //   http: true,
    //   port: 8000,
    // }),
  ],
  controllers: [ReservationController],
  providers: [ReservationsRepository],
})
export class ReservationModule {}
