import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { CommonLogger, DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { Reservation, ReservationSchema } from './models/reservation.schema';
import { User, UserSchema } from 'apps/auth/src/users/models/user.schema';

@Module({
  imports: [
    DatabaseModule,
    CommonLogger,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: User.name, schema: UserSchema },
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
